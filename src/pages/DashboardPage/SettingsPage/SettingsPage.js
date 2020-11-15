import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, RefreshControl, Switch, Platform } from 'react-native';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from '../styles';

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif';

export default function SettingsPage({navigation})
{
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
          console.log("this is user data " + userData[0]);
          console.log("this is user data " + userData[0].fullName);
     });

    const settingsData: SettingsData = [
      {
        type: 'SECTION',
        header: 'General',
        rows: [
          {
            title: 'Email',
            subtitle: user.email,
            showDisclosureIndicator: false,
          },
          {
            title: 'Name',
            showDisclosureIndicator: false,
          },
          {
            title: 'Currency',
            renderAccessory: () => (
              <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
                $
              </Text>
            )
          },
          {
            title: 'Change Password',
            showDisclosureIndicator: true,
          },
          {
            title: 'Dark Mode',
            renderAccessory: () => <Switch value onValueChange={() => {}} />,
          },
        ],
      },
    ]

    return (
        <View style={styles.container}>
          <SettingsScreen
            data={settingsData}
            globalTextStyle={{ fontFamily }}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    this.setState({ refreshing: true })
                    setTimeout(() => this.setState({ refreshing: false }), 3000)
                  }}
                />
              ),
            }}
          />
        </View>
    )
}
