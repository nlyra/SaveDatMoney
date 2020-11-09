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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Tab = createMaterialBottomTabNavigator();

export default function DashboardPage({navigation})
{
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="Budget"
          barStyle={{ backgroundColor: '#2ea44f' }}
          backBehavior='history'
          shifting={false}
          labeled={false}
        >
          <Tab.Screen
            name="Budget"
            component={BudgetPage}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="currency-usd" color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: e => {
                navigation.setOptions({ title: 'Budget' })
              },
            }}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionsPage}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: e => {
                navigation.setOptions({ title: 'Transactions' } )

              },
            }}
          />
          <Tab.Screen
            name="Insights"
            component={InsightsPage}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-bubble" color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: e => {
                navigation.setOptions({ title: 'Insights' })
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="video-input-svideo" color={color} size={26} />
              ),
            }}
            listeners={{
              tabPress: e => {
                navigation.setOptions({ title: 'Settings' })
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
}
