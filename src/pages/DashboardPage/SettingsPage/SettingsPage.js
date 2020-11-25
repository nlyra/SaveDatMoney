import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableHighlight, View,
         Switch, Platform, ScrollView, Modal, FlatList } from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import { TouchableRipple } from 'react-native-paper';
import WebModal from 'modal-enhanced-react-native-web';
import { Actions, Router, Scene  } from "react-native-router-flux";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);


export default function SettingsPage({navigation})
{
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isThemeDark, setIsThemeDark] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState('');

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    const toggleTheme = () => setIsThemeDark(!isThemeDark);

    const changePassword = () => {
      user.updatePassword(password);
      setModalVisible(!modalVisible);
    };

    // const preferences = React.useMemo(
    //   () => ({
    //     toggleTheme,
    //     isThemeDark,
    //   }),
    //   [toggleTheme, isThemeDark]
    // );

    const editEmail = () => {
      user.updateEmail(email);
    };

    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const doLogout = () => {
      window.location.reload(false);
    };

    if (user != null) {
      uid = user.uid;
    };

    var userRef = firebase.database().ref("users");
    userRef.orderByChild("id").equalTo(uid).on("child_added", function(snapshot) {
        userData.push({
            ...snapshot.val(),
           key: snapshot.key,
        });
        console.log("this is user data " + userData[0].fullName);
        console.log(userData);
    });



    return (
      <View>
        {Platform.OS === 'ios' ?
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Change Password</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="black"
                  placeholder='New Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <View style={styles.modalButtons}>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={changePassword}>
                    <Text style={styles.buttonTitle}>Save</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                    <Text style={styles.buttonTitle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          :
          <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Change Password</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="black"
                  placeholder='New Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <View style={styles.modalButtons}>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={changePassword}>
                    <Text style={styles.buttonTitle}>Save</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                    <Text style={styles.buttonTitle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </WebModal>
        }
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name</Text>
              <Text style={styles.textStyle}>     {user.displayName}</Text>
              <Text style={styles.modalText}>Currency</Text>
              <Text style={styles.textStyle}>     $</Text>
              <ScrollView contentContainerStyle={{
                flexDirection: "row",
                marginTop: 15,
              }}>
                <Text style={styles.modalText}>Dark Mode</Text>
                <Switch
                  style={{
                    marginLeft: 50,
                  }}
                  onValueChange={toggleTheme}
                  value={isThemeDark}
                />
              </ScrollView>
              <View style={styles.bottomContainer}>
                <TouchableHighlight style={[buttons.standard, {margin: 20}]} onPress={closeModal}>
                    <Text style={styles.buttonTitle}>Change Password</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.logoutButton, {margin:20}]} onPress={doLogout}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
}
