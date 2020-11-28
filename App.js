import './src/firebase/config';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RegistrationPage from './src/pages/RegistrationPage/RegistrationPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
//import DashboardPage from './src/pages/DashboardPage/DashboardPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordPage from './src/pages/ForgotPasswordPage/ForgotPasswordPage';
import BudgetPage from './src/pages/DashboardPage/BudgetPage/BudgetPage';
import TransactionsPage from './src/pages/DashboardPage/TransactionsPage/TransactionsPage';
import InsightsPage from './src/pages/DashboardPage/InsightsPage/InsightsPage';
import SettingsPage from './src/pages/DashboardPage/SettingsPage/SettingsPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Platform } from 'react-native';
//import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Dashboard({navigation}){
  return (
    <Tab.Navigator
      initialRouteName="Budget"
      barStyle={{ backgroundColor: '#2ea44f' }}
      backBehavior='history'
      shifting={false}
      labeled={Platform.OS === 'ios' || Platform.OS === 'android' ?
        false : true
      }
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
              navigation.setOptions({ title: 'Transactions' })
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
  );
}

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Registration" component={RegistrationPage} />
            <Stack.Screen name="Budget" component={Dashboard} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
