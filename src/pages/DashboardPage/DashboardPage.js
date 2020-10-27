import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Navigator, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import styles from './styles';
import BudgetPage from './BudgetPage/BudgetPage';
import TransactionsPage from './TransactionsPage/TransactionsPage';
import InsightsPage from './InsightsPage/InsightsPage';
import SettingsPage from './SettingsPage/SettingsPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();

export default function DashboardPage({navigation})
{
    return (
      <View style={styles.container}>

      </View>
    )
}
