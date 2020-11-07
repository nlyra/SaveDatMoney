import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import styles from './TransactionsPage/styles';
import {IconButton} from 'react-native-paper';
import {format, subMonths, addMonths} from 'date-fns'; 

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
        <View style={styles.topContainer}>
                <IconButton icon = "arrow-left" onPress = {handlePrev}/>
                <Text style={styles.date}>{currentDate}</Text>
                <IconButton icon = "arrow-right" onPress = {handleNext}/>
        </View>
    )
}

export default MonthPicker;