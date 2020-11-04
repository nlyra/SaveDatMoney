import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Button, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';
import moment from 'moment'; 



export default function TransactionsPage({navigation})
{
    var now = moment().format();
    var currentDate = moment().format("DD/MM/YYYY");

    return (
        
        <View style={styles.mainContainer} >

            <View style={styles.topContainer}>
                <Text style={styles.date}>{currentDate}</Text>
            </View>

            <View style={styles.bodyContainer}>

                <View style={styles.transactions}>
                    <Text style={styles.transactionText}>Transactions</Text>
                    <Button title="+" color= "black" onPress={() => Alert.alert('Add')}/>
                </View>

                <Text style={[{marginRight: '5%'}]} >Category</Text>
                <Text style={[{marginRight: '5%'}]} >Cost</Text>
            </View>

           <View style={styles.bottomContainer}>
                <TouchableOpacity style={[{marginRight: '5%'}, buttons.long]} onPress={console.log("hi there")}>
                    <Text style={styles.buttonTitle}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons.long} onPress={console.log("hi there")}>
                    <Text style={styles.buttonTitle}>Income</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
