import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, RefreshControl, Switch, Platform } from 'react-native';
import { SettingsScreen, SettingsData } from 'react-native-settings-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from '../styles';

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif';

export default function SettingsPage({navigation})
{
    const settingsData: SettingsData = [
      {
        type: 'SECTION',
        header: 'General',
        rows: [
          {
            title: 'Email',
            subtitle: 'hardcoded@email.com',
            showDisclosureIndicator: true,
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
