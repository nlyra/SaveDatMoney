import './src/firebase/config';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RegistrationPage from './src/pages/RegistrationPage/RegistrationPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
//import DashboardPage from './src/pages/DashboardPage/DashboardPage';
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
import {
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import {AuthContext} from './components/context'


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Dashboard({navigation}){
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme);
      }
  }), []);

  const CustomDefaultTheme = {
    ... NavigationDefaultTheme,
    ... PaperDefaultTheme,
    colors: {
        ... NavigationDefaultTheme.colors,
        ... PaperDefaultTheme.colors,
        backgroumd: "#ffffff",
        text: "#000000",
        accent: "#ffffff",
        surface: "#f0f0f0",
        green: '#2ea44f',
        danger: '#F85757',
        warning: '#ffe700',
        white: '#FFFFFF',
        black: '#000000',
        grey: '#808080',
    }
}
const CustomDarkTheme = {
    ... NavigationDarkTheme,
    ... PaperDarkTheme,
    colors: {
      primary: "#23272A",
      accent: "#99AAB5",
      background: "#23272A",
      surface: "#2C2F33",
      card: "##99AAB5",
      text: "#FFFFFF",
      border: "#23272A",
      notification: "#23272A",
      backdrop: "#FFFFFF",
      gray: "gray",
      green: '#2ea44f',
      danger: '#F85757',
      warning: '#ffe700',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#808080',
    }
  }
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    <NavigationContainer independent={true} theme={theme}>
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
    </NavigationContainer>
    </AuthContext.Provider>
          </PaperProvider>
  );
}

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  
    const authContext = React.useMemo(() => ({
      toggleTheme: () => {
          setIsDarkTheme( isDarkTheme => !isDarkTheme);
        }
    }), []);

    const CustomDefaultTheme = {
      ... NavigationDefaultTheme,
      ... PaperDefaultTheme,
      colors: {
          ... NavigationDefaultTheme.colors,
          ... PaperDefaultTheme.colors,
          backgroumd: "#ffffff",
          text: "#000000",
          accent: "#ffffff",
          surface: "#f0f0f0",
          green: '#2ea44f',
          danger: '#F85757',
          warning: '#ffe700',
          white: '#FFFFFF',
          black: '#000000',
          grey: '#808080',
      }
  }
  const CustomDarkTheme = {
      ... NavigationDarkTheme,
      ... PaperDarkTheme,
      colors: {
        primary: "#23272A",
        accent: "#99AAB5",
        background: "#23272A",
        surface: "#2C2F33",
        card: "##99AAB5",
        text: "#FFFFFF",
        border: "#23272A",
        notification: "#23272A",
        backdrop: "#FFFFFF",
        gray: "gray",
        green: '#2ea44f',
        danger: '#F85757',
        warning: '#ffe700',
        white: '#FFFFFF',
        black: '#000000',
        grey: '#808080',
      }
    }
      const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Registration" component={RegistrationPage} />
              <Stack.Screen name="Budget" component={Dashboard} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
          </Stack.Navigator>
         </NavigationContainer>
        </AuthContext.Provider>
    </PaperProvider>
  );
}
