import React, { useState} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import WebModal from 'modal-enhanced-react-native-web';
import { Divider, DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TransactionsPage({navigation})
{
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);

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

    const deleteTransaction = key => {
        console.log("this is the key " + key)
        firebase.database().ref("/transaction/"+key).remove();
    }

    const editTransaction = key => {
        setModal2Visible(!modal2Visible);
        console.log("this is the key " + key)
    }

    const closeModal = () => {
        setModalVisible(!modalVisible);
    }

    const closeModal2 = () => {
        setModal2Visible(!modal2Visible);
    }


    /* Get data from the database */
    var ref = firebase.database().ref("transaction");
    ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
        userData.push({
            ...snapshot.val(),
            key: snapshot.key,
          });
        console.log("here is the key" + userData[0].key);
        console.log(userData);
    });

    return ( 
        
        <View style={styles.mainContainer}> 

            <View style={styles.topContainer}>
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/> 

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

            {/* If user  */}
            {Platform.OS === 'ios' ?
            <Modal animationType="slide" transparent={true} visible={modal2Visible} onRequestClose={() => {
            Alert.alert("Modal has been closed.");}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit</Text>
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
                            <TouchableHighlight style={buttons.standard} onPress={closeModal2}>
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
            <WebModal animationType="slide" transparent={true} visible={modal2Visible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Edit</Text>
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
                                <TouchableHighlight style={buttons.standard} onPress={closeModal2}>
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
  
            <View style={styles.bodyContainer}>

                <DataTable>
                    <DataTable.Header>
                    <Button title="+" color= "black" onPress={()=> {setModalVisible(true);}}/>
                    <DataTable.Title transaction>Transactions</DataTable.Title>
                    <DataTable.Title description>Description</DataTable.Title>
                    <DataTable.Title cost>Cost</DataTable.Title>
                    <DataTable.Title delete>Delete</DataTable.Title>
                    <DataTable.Title edit>Edit</DataTable.Title>

                    </DataTable.Header>
                        <FlatList 
                            data={userData}
                            keyExtractor = {(col) => col.id}
                            renderItem={({item})=> (
                                <DataTable.Row>
                                    <DataTable.Cell transaction>{item.category}</DataTable.Cell>
                                    <DataTable.Cell description >{item.description}</DataTable.Cell>
                                    <DataTable.Cell cost >{'$' + item.cost}</DataTable.Cell>
                                    <DataTable.Cell delete>
                                        <MaterialCommunityIcons name="trash-can-outline" color={colors.danger} size={26} onPress={() => deleteTransaction(item.key)}/>
                                    </DataTable.Cell>
                                    <DataTable.Cell edit>
                                        <MaterialCommunityIcons name="pencil-outline" color={colors.warning} size={26} onPress={() => editTransaction(item.key)}/>
                                    </DataTable.Cell>
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
