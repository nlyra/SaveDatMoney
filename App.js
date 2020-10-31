import './src/firebase/config';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RegistrationPage from './src/pages/RegistrationPage/RegistrationPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
import DashboardPage from './src/pages/DashboardPage/DashboardPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const Stack = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Registration" component={RegistrationPage} />
            <Stack.Screen name="Budget" component={DashboardPage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
