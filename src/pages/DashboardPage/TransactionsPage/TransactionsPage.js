import React, { useState, Component } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';
import {format, subMonths, addMonths} from 'date-fns'; 
import MonthPicker from '../MonthPicker'
import Modal from 'modal-enhanced-react-native-web';

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

    if (user != null) {
    uid = user.uid;  
    }

    // Find all dinosaurs whose height is exactly 25 meters.
    var ref = firebase.database().ref("transaction");
    ref.orderByChild("date").equalTo("October 2020").on("child_added", function(snapshot) {
        console.log(snapshot.key);
        console.log("this is it: " + snapshot.key)
        snapshot.val().cost;
    }); 

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */

    const addTransaction = (e) => {
        var transaction1 = { category: category, cost: cost, description: description, userId: uid, date: "October 2020"};
        firebase.database().ref('/transaction').push(transaction1);
        console.log("pushed");

        setModalVisible(!modalVisible);
    }

    return ( 

        <View style={styles.mainContainer} >
            {/*  
            <FlatList ListHeaderComponent={
                <MonthPicker date={date} onChange={(newDate) => setDate(newDate)} />
            }
            />
            */}

        {/* Modal */}
        <View style={styles.topContainer}>
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
                    </View>
                </View>
            </Modal>
            {/* Modal End */}

        </View>
  
        <View style={styles.bodyContainer}>

            <View style={styles.transactions}>
                <Text style={styles.transactionText}>Transactions</Text>
                <Button title="+" color= "black" onPress={()=> {setModalVisible(true);}}/>
            </View>

            <Text style={[{marginRight: '5%'}]} >Category</Text>
            <Text style={[{marginRight: '5%'}]} >Cost</Text>
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
