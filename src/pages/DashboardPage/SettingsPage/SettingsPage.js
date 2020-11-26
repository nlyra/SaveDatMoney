import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableHighlight, View,
         Switch, Platform, ScrollView, Modal, FlatList } from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import { Value } from 'react-native-reanimated';
import {AppearanceProvider} from 'react-native-appearance';
import { TouchableRipple, useTheme } from 'react-native-paper';
import {AuthContext} from '../../../../components/context'



export default function SettingsPage({navigation})
{
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    const changePassword = () => {
      user.updatePassword(password);
    };


    const editEmail = () => {
      user.updateEmail(email);
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

    const {toggleTheme} = React.useContext(AuthContext);
    const paperTheme = useTheme();
    const { colors } = useTheme();

    return (
          <ScrollView>
            <View style={[styles.modalView, {
              backgroundColor: colors.card
            }]}>
              <Text style={[styles.modalText, {
                color: colors.text
              }]}>Name</Text>
              <Text style={styles.textStyle}>     {user.displayName}</Text>
              <Text style={[styles.modalText, {
                color: colors.text
              }]}>Change Password</Text>
              <TextInput
                style={[styles.input, {
                  backgroundColor: colors.accent,
                  color: colors.text
                }]}
                placeholderTextColor={ colors.text}
                placeholder='Change Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Text style={[styles.modalText, {
                color: colors.text
              }]}>Currency</Text>
              <Text style={styles.textStyle}>     $</Text>
              <Text style={[styles.modalText, {
                color: colors.text
              }]}>Change Password</Text>
              <ScrollView contentContainerStyle={{
                flexDirection: "row",
                marginTop: 15,
              }}>
                <Text style={[styles.modalText, {
                color: colors.text
              }]}>Dark Mode</Text>
                  <TouchableRipple onPress={() => {toggleTheme()}}>
                    <Switch 
                      style={{
                      marginLeft: 50,
                      }}
                     value={paperTheme.dark}/>
                  </TouchableRipple>
              </ScrollView>
              <TouchableHighlight style={buttons.standard}>
                  <Text style={styles.buttonTitle}>Save</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
    )
}
