import './src/firebase/config';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RegistrationPage from './src/pages/RegistrationPage/RegistrationPage';
import LoginPage from './src/pages/LoginPage/LoginPage';
import DashboardPage from './src/pages/DashboardPage/DashboardPage';
import {
    NavigationContainer, 
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordPage from './src/pages/ForgotPasswordPage/ForgotPasswordPage';
//import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AppearanceProvider } from 'react-native-appearance'
import {
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import {AuthContext} from './components/context'


const Stack = createStackNavigator();

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
    
  return (
      <AppearanceProvider>
          <PaperProvider theme={theme}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="Registration" component={RegistrationPage} />
                    <Stack.Screen name="Budget" component={DashboardPage} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                </Stack.Navigator>
            </NavigationContainer>
            </AuthContext.Provider>
        </PaperProvider>
        
      </AppearanceProvider>
  );
}
