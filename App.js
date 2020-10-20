import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/pages/LoginPage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

export default function App() {
  return (
    //<LoginPage />
    // <BrowserRouter >      
    //   <Switch>        
    //     <Route path="/" exact>          
    //     <LoginPage />        
    //     </Route>            
    //     <Redirect to="/" />      
    //   </Switch>      
    // </BrowserRouter>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Nate and fede wuz here</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
