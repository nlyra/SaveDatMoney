import React, { useEffect,useState} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated, Dimensions} from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import WebModal from 'modal-enhanced-react-native-web';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Actions, Router, Scene  } from "react-native-router-flux";
import SwitchSelector from "react-native-switch-selector";
import { useTheme } from '@react-navigation/native'

    
export default function TransactionsPage ({navigation})
{
  
    const [refresh, setRefresh] = useState("");
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [radio, setRadio] = useState('expense');
    const {currentlyOpenSwipeable, setCurrentlyOpenSwipeable} = useState(null);

    var user = firebase.auth().currentUser;

    var uid;
    var userData = [];
    var itemKey;
    var num = 0;

    if (user != null) {
    uid = user.uid;  
    } 

    useEffect(() => {
        // Interval to update count
        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            setRefresh({});
            console.log("Blur")
        });
    
        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    }, [navigation]);

     /* Get data from the database */
     var ref = firebase.database().ref("transaction");
     ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
         userData.push({
             ...snapshot.val(),
             key: snapshot.key,
           });
     });

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    const addTransaction = (e) => {
        var transaction1 = { category: category, cost: parseInt(cost), description: description, 
            expenseOrIncome: radio, userId: uid, date: format(date, 'MMMM, yyyy'), date_uid: format(date, 'MMMM, yyyy') + "_" + uid,
            date_uid_category_expenseOrIncome: format(date, 'MMMM, yyyy') + "_" + uid + "_" + category + "_" + radio
        };
        firebase.database().ref('/transaction').push(transaction1);
        console.log("pushed");

        // empties out fields for adding transaction 
        setCategory("");
        setDescription("");
        setCost(""); 

        setModalVisible(!modalVisible);
    }

    const closeModal = () => {
        setModalVisible(!modalVisible);
    }

    const RightActions = (progress, dragX, items) => {

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7,0]
        })
        const { colors } = useTheme();
        return (

            
            <>
            <View style={{ backgroundColor: colors.danger, justifyContent: 'center' }}>
                <Animated.Text
                    style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    transform: [{ scale }]
                    }}onPress={() => {Actions.scene2({itemKey : items.key, visible : true, onPressModelItem : _onPressModelItem})}}>
                    Delete
                </Animated.Text>
            </View>
            <View style={{ backgroundColor: colors.warning, justifyContent: 'center' }}>
                <Animated.Text
                    style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    transform: [{ scale }]
                    }}onPress = {() => {Actions.scene1({item: items, itemKey : items.key, visible : true , onPressModelItem : _onPressModelItem})}}>
                    Edit
                </Animated.Text>
            </View>
        </>
        )
    }

    const _onPressModelItem = () => {
        setRefresh({})
    }
    const { colors } = useTheme();
    return ( 
        
        <View style={styles.mainContainer}> 

            <View style={styles.topContainer}>

                {/* Add Modal */}
                {/* If user  */}
                {Platform.OS === 'ios' ?
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalText, {
                                color: colors.text
                            }]}>Add transaction</Text>
                            <SwitchSelector style={{padding:10}}
                                    initial={0}
                                    onPress={value => setRadio(value)}
                                    textColor={colors.green} 
                                    selectedColor={colors.white}
                                    buttonColor={colors.green}
                                    borderColor={colors.green}
                                    hasPadding
                                    options={[
                                        { label: "Expense", value: "expense" }, 
                                        { label: "Income", value: "income"}
                                    ]}
                            />
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.surface,
                                    color: colors.text }]}
                                placeholder='Category'
                                placeholderTextColor={colors.gray}
                                onChangeText={(text) => setCategory(text)}
                                value={category}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.surface,
                                    color: colors.text }]}
                                placeholderTextColor={colors.gray}
                                placeholder='Description'
                                onChangeText={(text) => setDescription(text)}
                                value={description}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.surface,
                                    color: colors.text }]}
                                placeholderTextColor={colors.gray}
                                placeholder='Amount'
                                onChangeText={(text) => setCost(text)}
                                value={cost}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <View style={styles.modalButtons}>
                                <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                                    <Text style={styles.buttonTitle}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={buttons.standard} onPress={addTransaction}>
                                    <Text style={styles.buttonTitle}>Save</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                :
                <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");}}>
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, {
                                backgroundColor: colors.background
                            }]}>
                                <Text style={[styles.modalText, {
                                color: colors.text
                            }]} >Add transaction</Text>
                                <SwitchSelector style={{padding:10}}
                                    initial={0}
                                    onPress={value => setRadio(value)}
                                    textColor={colors.green} 
                                    selectedColor={colors.white}
                                    buttonColor={colors.green}
                                    borderColor={colors.green}
                                    hasPadding
                                    options={[
                                        { label: "Expense", value: "expense" }, 
                                        { label: "Income", value: "income"} 
                                    ]}
                                />
                                <TextInput
                                    style={[styles.input, {
                                        backgroundColor: colors.surface,
                                        color: colors.text }]}
                                    placeholder='Category'
                                    placeholderTextColor={colors.gray}
                                    onChangeText={(text) => setCategory(text)}
                                    value={category}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={[styles.input, {
                                        backgroundColor: colors.surface,
                                        color: colors.text }]}
                                    placeholderTextColor={colors.gray}
                                    placeholder='Description'
                                    onChangeText={(text) => setDescription(text)}
                                    value={description}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={[styles.input, {
                                        backgroundColor: colors.surface,
                                        color: colors.text }]}
                                    placeholderTextColor={colors.gray}
                                    placeholder='Amount'
                                    onChangeText={(text) => setCost(text)}
                                    value={cost}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                                        <Text style={styles.buttonTitle}>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={buttons.standard} onPress={addTransaction}>
                                        <Text style={styles.buttonTitle}>Save</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </WebModal>
                }
            </View>
  
            {/* Table */}
            {Platform.OS === 'web' ? 
                <FlatList contentContainerStyle={{ flexGrow: 1 }}
                    style={styles.feed}
                    data={userData}
                    ListHeaderComponent = {<MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/> }
                    keyExtractor = {(col) => col.id}
                    renderItem={({item})=> (
                        <View style={styles.centeredView}>
                            <View style={[styles.feedItem, {
                                backgroundColor: colors.backdrop
                            }]}>
                                <View style={{flex:1}}>
                                 <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: colors.backdrop}}>
                                        <View>
                                            <Text style={styles.description}> {item.description}</Text>
                                            <Text style={[styles.category, {
                                                color: colors.text
                                            }]}> {item.category}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                                            <DeleteModal itemKey={item.key} onPressModelItem={_onPressModelItem}></DeleteModal>
                                            <EditModal itemKey={item.key} item={item} onPressModelItem={_onPressModelItem}></EditModal> 
                                            {item.expenseOrIncome === "expense" ? 
                                                <Text style={{color: colors.danger}} >-${item.cost}</Text>
                                            : 
                                                <Text style={{color: colors.green}} >${item.cost}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            :
                <FlatList contentContainerStyle={{ flexGrow: 1 }}
                    style={styles.feed}
                    data={userData}
                    ListHeaderComponent = {<MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/> }
                    keyExtractor = {(col) => col.id}
                    renderItem={({item})=> (
                        <View style={{ paddingBottom: 10}}>
                            <Swipeable  
                            renderRightActions={(progress,dragX) => RightActions(progress, dragX, item)}
                            >
                                <View style={{ paddingVertical: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={styles.feedItem}>
                                        <View style={{flex:1}}>
                                            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                                                <View>
                                                    <Text style={styles.description}> {item.description}</Text>
                                                    <Text style={styles.category}> {item.category}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                    {item.expenseOrIncome === "expense" ? 
                                                        <Text style={{color: colors.danger}} >-${item.cost}</Text>
                                                    : 
                                                        <Text style={{color: colors.green}} >${item.cost}</Text>
                                                    }
                                                    
                                                </View>
                                            </View>
                                            <Router>
                                                <Scene key = "root">
                                                    <Scene key="scene1" component={EditModal} item={item} itemKey = {item.key} onPressModelItem={_onPressModelItem} visible = {false} hideNavBar />
                                                    <Scene key="scene2" component={DeleteModal} itemKey={item.key} onPressModelItem={_onPressModelItem} visible = {false} hideNavBar />
                                                </Scene>
                                            </Router>
                                        </View>
                                    </View>
                                </View>
                            </Swipeable>   
                        </View>
                    )}
                />
            }
            <View style={styles.bottomContainer}>
                <MaterialCommunityIcons style={styles.elevationLow} name="plus-circle" color={colors.green} size={55} onPress={()=> {setModalVisible(true);}}/>
            </View>
        </View>
    );
}

