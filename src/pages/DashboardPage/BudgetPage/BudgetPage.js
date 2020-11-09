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

export default function BudgetPage({navigation})
{
    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [spent, setSpent] = useState('');
    const [budget, setBudget] = useState('');
    const [category, setName] = useState('');
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

    const addCategory = (e) => {
        var category1 = { userId: uid, category: category, description: description, budget: budget, spentAmount: spent, date: format(date, 'MMMM, yyyy'), date_uid: format(date, 'MMMM, yyyy')+'_'+uid};
        firebase.database().ref('/category').push(category1);
        console.log("pushed");

        setModalVisible(!modalVisible);
    }

    const deleteCategory = key => {
        console.log("this is the key " + key)
        firebase.database().ref("/category/"+key).remove();
    }

    const editCategory = key => {
        console.log("this is the key " + key)
    }

    const closeModal = (e) => {
        setModalVisible(!modalVisible);
    }

    /* Get data from the database */
    var ref = firebase.database().ref("category");
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
                                onChangeText={(text) => setName(text)}
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
                                onChangeText={(text) => setBudget(text)}
                                value={budget}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <View style={styles.modalButtons}>
                                <TouchableHighlight style={buttons.standard} onPress={closeModal}>
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
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Expense</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Category'
                                    placeholderTextColor="black"
                                    onChangeText={(text) => setName(text)}
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
                                    onChangeText={(text) => setBudget(text)}
                                    value={budget}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableHighlight style={buttons.standard} onPress={closeModal}>
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
  
            <View style={styles.bodyContainer}>

                <DataTable>
                    <DataTable.Header>
                    <Button title="+" color= "black" onPress={()=> {setModalVisible(true);}}/>
                    <DataTable.Title category>Category</DataTable.Title>
                    <DataTable.Title description>Description</DataTable.Title>
                    <DataTable.Title budget>Budget</DataTable.Title>
                    <DataTable.Title delete>Delete</DataTable.Title>
                    <DataTable.Title delete>Edit</DataTable.Title>

                    </DataTable.Header>
                        <FlatList 
                            data={userData}
                            keyExtractor = {(col) => col.id}
                            renderItem={({item})=> (
                                <DataTable.Row>
                                    <DataTable.Cell category>{item.name}</DataTable.Cell>
                                    <DataTable.Cell description >{item.description}</DataTable.Cell>
                                    <DataTable.Cell budget >{'$' + item.budget}</DataTable.Cell>
                                    <DataTable.Cell delete>
                                        <MaterialCommunityIcons name="trash-can-outline" color={colors.danger} size={26} onPress={() => deleteCategory(item.key)}/>
                                    </DataTable.Cell>
                                    <DataTable.Cell delete>
                                        <MaterialCommunityIcons name="pencil-outline" color={colors.warning} size={26} onPress={() => editCategory(item.key)}/>
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
