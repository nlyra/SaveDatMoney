import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from '../styles';


export default function InsightsPage({navigation})
{
    return (
        <View style={styles.container}>
            <Text>Insights Page</Text>
        </View>
    )
}