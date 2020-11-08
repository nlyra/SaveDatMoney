import React, { useState, Component } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';
import {format, subMonths, addMonths} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import WebModal from 'modal-enhanced-react-native-web';
import { List, Divider, DataTable, Provider as PaperProvider} from 'react-native-paper';

export default function TransactionsPage({navigation})
{
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    if (user != null) {
    uid = user.uid;  
    } 

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    const addTransaction = (e) => {
        var transaction1 = { category: category, cost: cost, description: description, userId: uid, date: format(date, 'MMMM, yyyy'), date_uid: format(date, 'MMMM, yyyy') + "_" + uid};
        firebase.database().ref('/transaction').push(transaction1);
        console.log("pushed");

        setModalVisible(!modalVisible);
    }

    const closeModal = (e) => {
        setModalVisible(!modalVisible);
    }

    var ref = firebase.database().ref("transaction");
    ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
        userData.push(snapshot.val());
        console.log(userData);
    });
    // ref.orderByChild("date").equalTo(format(date, 'MMMM, yyyy')).on("child_added", function(snapshot) {
    //     userData.push(snapshot.val());
    //     console.log(userData);
    // });


    return ( 

        <View style={styles.mainContainer}> 

        <View style={styles.topContainer}>
        <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/> 

            {Platform.OS === 'ios' ?
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
            Alert.alert("Modal has been closed.");}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Expense</Text>
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
                        <TouchableHighlight style={buttons.standard} onPress={addTransaction}>
                            <Text style={styles.buttonTitle}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={buttons.standard}>
                            <Text style={styles.buttonTitle} onPress={closeModal}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            :
            <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Expense</Text>
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
                            <TouchableHighlight style={buttons.standard} onPress={addTransaction}>
                                <Text style={styles.buttonTitle}>Save</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={buttons.standard}>
                                <Text style={styles.buttonTitle} onPress={closeModal}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </WebModal>
            }
  
        </View>
  
        <View style={styles.bodyContainer}>

            <DataTable>
                <DataTable.Header>
                <Button title="+" color= "black" onPress={()=> {setModalVisible(true);}}/>
                <DataTable.Title transaction>Transactions</DataTable.Title>
                <DataTable.Title description>Description</DataTable.Title>
                <DataTable.Title cost>Cost</DataTable.Title>
                
                </DataTable.Header>
                    <FlatList 
                        data={userData}
                        keyExtractor = {(col) => col.id}
                        renderItem={({item})=> (
                            <DataTable.Row>
                                <DataTable.Cell transaction>{item.category}</DataTable.Cell>
                                <DataTable.Cell description >{item.description}</DataTable.Cell>
                                <DataTable.Cell cost >{'$' + item.cost}</DataTable.Cell>
                                <Divider />
                            </DataTable.Row>
                        )}
                    />
            </DataTable>
        </View>

        <View style={styles.bottomContainer}>
                <TouchableOpacity style={[{marginRight: '5%'}, buttons.long]} onPress={() => console.log("hi there")}>
                    <Text style={styles.buttonTitle}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons.long} onPress={() => console.log("hi there")}>
                    <Text style={styles.buttonTitle}>Income</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
