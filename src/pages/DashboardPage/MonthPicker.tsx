import React, { useState, Component } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import styles from './TransactionsPage/styles';
import {IconButton} from 'react-native-paper';
import {format, subMonths, addMonths} from 'date-fns'; 
import { render } from 'react-native-web';

type MonthPickerProps = {
    date: Date
    onChange: (newDate: Date) => void
};

var currentDate = ""; 
var newDate;



const MonthPicker: React.FC<MonthPickerProps> = ({date, onChange}) => {

    const handlePrev = () => {
        newDate = subMonths(date, 1);
        onChange(newDate);
    };

    const handleNext = () => {
        newDate = addMonths(date, 1);
        onChange(newDate);
    };

    return (

        <View style={styles.calendar}>
                
                <IconButton icon = "arrow-left" onPress = {handlePrev}/>
                <Text>{format(date, 'MMMM, yyyy')} </Text>
                <IconButton icon = "arrow-right" onPress = {handleNext}/>
        </View>
    )
}

export default MonthPicker;