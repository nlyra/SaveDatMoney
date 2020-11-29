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
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Tab = createMaterialBottomTabNavigator();


export default function DashboardPage({navigation})
{
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ... NavigationDefaultTheme,
    ... PaperDefaultTheme,
    colors: {
        ... NavigationDefaultTheme.colors,
        ... PaperDefaultTheme.colors,
        backgroumd: "#ffffff",
        text: "#000000",
        accent: "#f0f0f0",
    }
}
const CustomDarkTheme = {
  ... NavigationDarkTheme,
  ... PaperDarkTheme,
  colors: {
    primary: "#23272A",
    accent: "#99AAB5",
    background: "#23272A",
    surface: "#99AAB5",
    card: "##99AAB5",
    text: "#FFFFFF",
    border: "#23272A",
    notification: "#23272A",
    backdrop: "#FFFFFF"
  }
}
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme);
      }
  }), []);
  const { colors } = useTheme();
    return (
      // <PaperProvider theme={theme}>
      //   <AuthContext.Provider value={authContext}>
      //     <NavigationContainer independent={true} theme={theme}>
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
      //  </NavigationContainer>
       //   </AuthContext.Provider>
       //   </PaperProvider>

    )
}
