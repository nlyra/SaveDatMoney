import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableHighlight, View,
         Switch, Platform, ScrollView, Modal, Span } from 'react-native';
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

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function SettingsPage({navigation})
{
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isThemeDark, setIsThemeDark] = React.useState(false);

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = React.useCallback(() => {
      return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
      () => ({
        toggleTheme,
        isThemeDark,
      }),
      [toggleTheme, isThemeDark]
    );

    const editEmail = () => {
      user.updateEmail(email);
    }

    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    if (user != null) {
      uid = user.uid;
    }

    var userRef = firebase.database().ref("users");
    userRef.orderByChild("id").equalTo(uid).on("child_added", function(snapshot) {
         userData.push({
             ...snapshot.val(),
             key: snapshot.key,
           });
          console.log("this is user data " + userData[0].fullName);
     });

    return (
      <ScrollView>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            placeholder='Enter new name'
            autoCapitalize="words"
            onChangeText={(text) => setName(text)}
            value={name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            />
          <Text style={styles.modalText}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            placeholder='Description'
            onChangeText={(text) => setName(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.modalText}>Currency</Text>
          <Text style={styles.textStyle}>    $</Text>
          <Text style={styles.modalText}>Change Password</Text>
          <ScrollView contentContainerStyle={{
            flexDirection: "row",
          }}>
            <Text style={styles.modalText}>Dark Mode</Text>
            <Switch
              style={{
                marginLeft: 50,
              }}
              onValueChange={toggleTheme}
              value={theme}
            />
          </ScrollView>
        </View>
      </ScrollView>
    )
}
