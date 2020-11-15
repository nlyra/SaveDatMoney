import React, { useState} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import WebModal from 'modal-enhanced-react-native-web';
import { Divider, DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import EditModal from './EditModal';
import render from 'react-native-web/dist/cjs/exports/render';

export default function TransactionsPage({navigation})
{
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [refresh, setRefresh] = useState('');
    var user = firebase.auth().currentUser;

    var uid;
    var userData = [];
    var itemKey;
    var num = 0;

    if (user != null) {
    uid = user.uid;  
    } 

     /* Get data from the database */
     var ref = firebase.database().ref("transaction");
     ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
         userData.push({
             ...snapshot.val(),
             key: snapshot.key,
           });
           console.log(format(date, 'MMMM, yyyy'));
         console.log("here is the key" + userData[0].key);
         console.log(userData);
     });

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    const addTransaction = (e) => {
        var transaction1 = { category: category, cost: cost, description: description, userId: uid, date: format(date, 'MMMM, yyyy'), date_uid: format(date, 'MMMM, yyyy') + "_" + uid};
        firebase.database().ref('/transaction').push(transaction1);
        console.log("pushed");

        // empties out fields for adding transaction 
        setCategory("");
        setDescription("");
        setCost(""); 

        setModalVisible(!modalVisible);
    }

    const deleteTransaction = key => {
        console.log("this is the key " + key)
        firebase.database().ref("/transaction/"+key).remove();
        setRefresh([]);
    }

    const closeModal = () => {
        setModalVisible(!modalVisible);
    }

    const editTransaction = (item) => {
        console.log("hii");
        console.log("this is item " + item.category);
        console.log("this is item key " + item.key);
        <EditModal itemKey={item.key} item={item}></EditModal>
    }

    const RightActions = (progress, dragX, item) => {

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7,0]
        })

        return (
            <>
            <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
                <Animated.Text
                    style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    transform: [{ scale }]
                    }}onPress={() => deleteTransaction(item.key)}>
                    Delete
                </Animated.Text>
            </View>
            <View style={{ backgroundColor: 'green', justifyContent: 'center' }}>
                <Animated.Text
                    style={{
                    color: 'white',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    transform: [{ scale }]
                    }} onPress={() => editTransaction}>
                    Edit
                </Animated.Text>
            </View>
            {/* <EditModal itemKey={item.key} item={item}></EditModal> */}
        </>
          
        )
    }

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
                            <Text style={styles.modalText}>Add</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Category'
                                placeholderTextColor="black"
                                onChangeText={(text) => setCategory(text)}
                                value={category}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="black"
                                placeholder='Description'
                                onChangeText={(text) => setDescription(text)}
                                value={description}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="black"
                                placeholder='Cost'
                                onChangeText={(text) => setCost(text)}
                                value={cost}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <View style={styles.modalButtons}>
                                <TouchableHighlight style={buttons.standard} onPress={closeModal}>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Add</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Category'
                                    placeholderTextColor="black"
                                    onChangeText={(text) => setCategory(text)}
                                    value={category}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="black"
                                    placeholder='Description'
                                    onChangeText={(text) => setDescription(text)}
                                    value={description}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="black"
                                    placeholder='Cost'
                                    onChangeText={(text) => setCost(text)}
                                    value={cost}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableHighlight style={buttons.standard} onPress={closeModal}>
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
                        <View style={styles.feedItem}>
                            <View style={{flex:1}}>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                                    <View>
                                        <Text style={styles.description}> {item.description}</Text>
                                        <Text style={styles.category}> {item.category}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                                        <MaterialCommunityIcons name="trash-can-outline" color={colors.danger} size={26} onPress={() => deleteTransaction(item.key)}/>
                                        <EditModal itemKey={item.key} item={item}></EditModal>
                                        <Text>${item.cost}</Text>
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
                        <Swipeable  renderRightActions={(progress,dragX) => RightActions(progress, dragX, item)}>
                            <View style={{ paddingVertical: 1 }}>
                                <View style={styles.feedItem}>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                                            <View>
                                                <Text style={styles.description}> {item.description}</Text>
                                                <Text style={styles.category}> {item.category}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                                                {/* <MaterialCommunityIcons name="trash-can-outline" color={colors.danger} size={26} onPress={() => deleteTransaction(item.key)}/>
                                                <EditModal itemKey={item.key} item={item}></EditModal> */}
                                                <Text>${item.cost}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>   
                    )}
                />
            }

            <View style={styles.bottomContainer} >
                    <TouchableOpacity style={[{marginRight: '2%'}, buttons.long]} onPress={() => console.log("hi there")} >
                        <Text style={styles.buttonTitle}>Expenses</Text>
                    </TouchableOpacity>
                    <MaterialCommunityIcons style={styles.addContainer} name="plus-box" color={colors.primary} size={55} onPress={()=> {setModalVisible(true);}}/>
                    <TouchableOpacity style={buttons.long} onPress={() => console.log("hi there")}>
                        <Text style={styles.buttonTitle}>Income</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

