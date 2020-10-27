import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import styles from './styles';
import BudgetPage from './BudgetPage/BudgetPage';
import TransactionsPage from './TransactionsPage/TransactionsPage';
import InsightsPage from './InsightsPage/InsightsPage';
import SettingsPage from './SettingsPage/SettingsPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();

export default function DashboardPage({navigation})
{
    return (
      <View style={styles.container}>
        <Tab.Navigator
          initialRouteName="Budget"
        >
          <Tab.Screen
            name="Budget"
            component={BudgetPage}
            options={{
              tabBarLabel: 'Budget',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="currency-usd" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionsPage}
            options={{
              tabBarLabel: 'Transactions',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Insights"
            component={InsightsPage}
            options={{
              tabBarLabel: 'Insights',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-bubble" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="video-input-svideo" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    )
}
