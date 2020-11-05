import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Button, Alert, FlatList, Modal } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';
import {format, subMonths, addMonths} from 'date-fns'; 
import {IconButton} from 'react-native-paper';
import MonthPicker from '../MonthPicker';


export default function TransactionsPage({navigation})
{

    const [date, setDate] = useState(new Date());
    const [message, setMessage] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [transaction, setTransaction] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    var user = firebase.auth().currentUser;
    var uid;
    const data = {
        date : date,
        cost : cost,
        category : category
    };

    if (user != null) {
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
    }

 
    const addTransaction = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (user != null) {
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
        }
        firebase.database().ref('transaction/' + uid).set(data).then(() => {
            
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setMessage(errorMessage);
        });
    }
    
    return (
        
        <View style={styles.mainContainer} >
            {/*  
            <FlatList ListHeaderComponent={
                <MonthPicker date={date} onChange={(newDate) => setDate(newDate)} />
            }
            />
            */}

            <View style={styles.bodyContainer}>

                <View style={styles.transactions}>
                    <Text style={styles.transactionText}>Transactions</Text>
                    <Button title="+" color= "black" onPress = {() => setModalVisible(true)}/>
                </View>

                <Text style={[{marginRight: '5%'}]} >Category</Text>
                <Text style={[{marginRight: '5%'}]} >Cost</Text>

                {/* Modal */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>

                            <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                        setModalVisible(true);
                        }}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableHighlight>
                    </View>

                {/* End Modal */}

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
    )
}
