import React, { useEffect, useState} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import WebModal from 'modal-enhanced-react-native-web';
import { Divider, ToggleButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import EditModal from './EditModal';
import render from 'react-native-web/dist/cjs/exports/render';
import DeleteModal from './DeleteModal';
import { Actions, Router, Scene  } from "react-native-router-flux";
import SwitchSelector from "react-native-switch-selector";
import { useTheme } from '@react-navigation/native'

export default function BudgetPage ({navigation})
{
     
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [planned, setPlanned] = useState('');
    const [category, setCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [radio, setRadio] = useState('expense');
    const [refresh, setRefresh] = useState("");
    const [spent, setSpent] = useState("");

    // // Get how much was spent in each category
    var refTransaction = firebase.database().ref("transaction");
    var ref = firebase.database().ref("category");

    var user = firebase.auth().currentUser;

    var uid;
    var userData = [];
    var itemKey;
    var num = 0;

    useEffect(() => {
        // Interval to update count
        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("Blur")
            setRefresh({});
        });
    
        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
        }, [navigation]);


    const editSpent = (key, total) => {

        var updates = {};
        updates['/spent'] = total;

        firebase.database().ref('category/' + key).update(updates);
     }

    if (user != null) {
    uid = user.uid;  
    } 

     /* Get data from the database */
     
    ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
         userData.push({
             ...snapshot.val(),
             key: snapshot.key,
           });
    });
    console.log("WE HEREEEEE" + userData);
    console.log(userData[0]);
    for(var i = 0; i < userData.length; i++){
        var total = 0;
        console.log("category is " + userData[i].category);
        refTransaction.orderByChild("date_uid_category_expenseOrIncome").equalTo(format(date, 'MMMM, yyyy') + '_' + uid + "_" + userData[i].category + "_" + userData[i].expenseOrIncome).on("child_added", function(snapshot2){
        total = total + snapshot2.val().cost;
        })
        userData[i].spent = total;
        editSpent(userData[i].key, total);
    }

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    const addCategory = (e) => {
        var category1 = { category: category, planned: parseInt(planned), spent: 0, expenseOrIncome: radio, userId: uid, date: format(date, 'MMMM, yyyy'), date_uid: format(date, 'MMMM, yyyy') + "_" + uid};
        firebase.database().ref('/category').push(category1);
        console.log("pushed");

        // empties out fields for adding transaction 
        setCategory("");
        setPlanned("");

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
        
        return (
            <>
            <View style={{ backgroundColor: colors.danger, justifyContent: 'center' }}>
                <Animated.Text
                    style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    transform: [{ scale }]
                    }}onPress={() => {Actions.scene4({itemKey : items.key, visible : true, onPressModelItem : _onPressModelItem})}}>
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
                    }}onPress = {() => {Actions.scene3({item: items, itemKey : items.key, visible : true , onPressModelItem : _onPressModelItem})}}>
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
                        <View style={[styles.modalView, {
                                    backgroundColor: colors.background
                                }]}>
                                    <Text style={[styles.modalText, {
                                        color: colors.text
                                    }]}>Add</Text>
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
                                    backgroundColor: colors.backdrop,
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
                                    backgroundColor: colors.backdrop,
                                    color: colors.text }]}
                                placeholderTextColor={colors.gray}
                                placeholder='Planned'
                                onChangeText={(text) => setPlanned(text)}
                                value={planned}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <View style={styles.modalButtons}>
                                <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                                    <Text style={styles.buttonTitle}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={buttons.standard} onPress={addCategory}>
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
                                }]}>Add category</Text>
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
                                        backgroundColor: colors.backdrop,
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
                                        backgroundColor: colors.backdrop,
                                        color: colors.text }]}
                                    placeholderTextColor={colors.gray}
                                    placeholder='Planned spending'
                                    onChangeText={(text) => setPlanned(text)}
                                    value={planned}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                                        <Text style={styles.buttonTitle}>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={buttons.standard} onPress={addCategory}>
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
                    ListHeaderComponent = {<MonthPicker date={date} onChange={() => loadData(), (newDate) => setDate(newDate)}/> }
                    keyExtractor = {(col) => col.id}
                    renderItem={({item})=> (
                        <View style={styles.centeredView}>
                            <View style={[styles.feedItem, {
                                backgroundColor: colors.backdrop
                            }]}>
                                <View style={{flex:1}}>
                                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', backgroundColor: colors.backdrop}}>
                                        <View>
                                            <Text style={styles.category}> {item.category}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: colors.backdrop}}>
                                            
                                            <DeleteModal itemKey={item.key} onPressModelItem={_onPressModelItem}></DeleteModal>
                                            <EditModal itemKey={item.key} item={item} onPressModelItem={_onPressModelItem}></EditModal>

                                            <View style={[styles.amountsContainer, {
                                                backgroundColor: colors.backdrop
                                            }]}> 
                                                <Text style={[styles.subtext, {
                                                    color: colors.text
                                                }]}>Difference</Text>
                                                {(item.planned - item.spent >= 0  && item.expenseOrIncome === "expense") || (item.planned - item.spent < 0 && item.expenseOrIncome === "income") ? 
                                                    <Text style={{color: colors.green}} >${Math.abs(parseInt(item.planned - item.spent))}</Text>
                                                : 
                                                    <Text style={{color: colors.danger}} >-${(Math.abs(parseInt(item.planned - item.spent)))}</Text>
                                                }
                                            </View>

                                            <View style={[styles.amountsContainer, {
                                                backgroundColor: colors.backdrop
                                            }]}> 
                                                {item.expenseOrIncome === "expense" ? 
                                                    <Text style={[styles.subtext, {
                                                        color: colors.text
                                                    }]}>Spent</Text>
                                                :
                                                <Text style={[styles.subtext, {
                                                    color: colors.text
                                                }]}>Earned</Text>
                                                }
                                                <Text style={{color: colors.text}} >${item.spent}</Text>
                                            </View>

                                                <View style={styles.amountsContainer}> 
                                                <Text style={[styles.subtext, {
                                                        color: colors.text
                                                    }]}>Expected</Text>
                                                <Text style={{color: colors.text}} >${item.planned}</Text>
                                            </View>

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
                            <Swipeable  renderRightActions={(progress,dragX) => RightActions(progress, dragX, item)}>
                                <View style={{ paddingVertical: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={styles.feedItem}>
                                        <View style={{flex:1}}>
                                            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                                                <View>
                                                    <Text style={styles.category}> {item.category}</Text>
                                                </View>
                                                <Router>
                                                        <Scene key = "root2">
                                                            <Scene key="scene3" component={EditModal} item={item} itemKey = {item.key} onPressModelItem={_onPressModelItem} visible = {false} hideNavBar />
                                                            <Scene key="scene4" component={DeleteModal} itemKey={item.key} onPressModelItem={_onPressModelItem} visible = {false} hideNavBar />
                                                        </Scene>
                                                </Router>
                                                <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>

                                                    <View style={styles.amountsContainer}> 
                                                        <Text style={styles.subtext}>Difference</Text>
                                                        {(item.planned - item.spent >= 0  && item.expenseOrIncome === "expense") || (item.planned - item.spent < 0 && item.expenseOrIncome === "income") ? 
                                                            <Text style={{color: colors.green}} >${Math.abs(parseInt(item.planned - item.spent))}</Text>
                                                        : 
                                                            <Text style={{color: colors.danger}} >-${(Math.abs(parseInt(item.planned - item.spent)))}</Text>
                                                        }
                                                    </View>

                                                    <View style={styles.amountsContainer}> 
                                                        {item.expenseOrIncome === "expense" ? 
                                                            <Text style={styles.subtext}>Spent</Text>
                                                        :
                                                            <Text style={styles.subtext}>Earned</Text>
                                                        }
                                                        <Text style={{color: colors.black}} >${item.spent}</Text>
                                                    </View>

                                                    <View style={styles.amountsContainer}> 
                                                        <Text style={styles.subtext}>Expected</Text>
                                                        <Text style={{color: colors.black}} >${item.planned}</Text>
                                                    </View>

                                                </View>
                                            </View>
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


