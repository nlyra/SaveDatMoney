import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../../stdStyles';


export default function TransactionsPage({navigation})
{
    return (
        <View style={styles.bottomContainer}>
            <TouchableOpacity style={[{marginRight: '5%'}, buttons.long]} onPress={console.log("hi there")}>
                <Text style={styles.buttonTitle}>Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.long} onPress={console.log("hi there")}>
                <Text style={styles.buttonTitle}>Income</Text>
            </TouchableOpacity>
        </View>
    )
}
