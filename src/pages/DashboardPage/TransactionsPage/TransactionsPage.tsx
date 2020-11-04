import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Button, Alert, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';
import {format, subMonths, addMonths} from 'date-fns'; 
import {IconButton} from 'react-native-paper';
import MonthPicker from '../MonthPicker';

export default function TransactionsPage({navigation})
{
    const [date, setDate] = useState(new Date());

    return (
        
        <View style={styles.mainContainer} >

            <FlatList ListHeaderComponent={
                <MonthPicker date={date} onChange={(newDate) => setDate(newDate)} />
            }
            />

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
