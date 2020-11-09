import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, RefreshControl, Switch, Platform } from 'react-native';
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
        header: 'My Section'.toUpperCase(),
        footer:
          'Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
        rows: [
          {
            title: 'A row',
            showDisclosureIndicator: true,
          },
          { title: 'A non-tappable row' },
          {
            title: 'This row has a',
            subtitle: 'Subtitle',
            showDisclosureIndicator: true,
          },
          {
            title: 'Long title. So long long long long long long long',
            subtitle:
              'And so is the subtitle. Even longer longer longer longer longer',
          },
          {
            title: 'Switch',
            renderAccessory: () => <Switch value onValueChange={() => {}} />,
          },
          {
            title: 'Text',
            renderAccessory: () => (
              <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
                Maybe
              </Text>
            ),
          },
          {
            title: 'Custom view',
            renderAccessory: () => (
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'blue',
                }}
              />
            ),
            showDisclosureIndicator: true,
          },
        ],
      },
      {
        type: 'SECTION',
        header: 'My Other Section'.toUpperCase(),
        rows: [
          {
            title: 'Dolor Nullam',
            showDisclosureIndicator: true,
          },
          {
            title: 'Nulla vitae elit libero',
            renderAccessory: () => (
              <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
                Dapibus
              </Text>
            ),
          },
          {
            title: 'Ipsum Lorem Venenatis',
            subtitle: 'Vestibulum Inceptos Fusce Justo',
            renderAccessory: () => (
              <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
                Yes
              </Text>
            ),
            showDisclosureIndicator: true,
          },
        ],
      },
      {
        type: 'SECTION',
        header: 'My Third Section'.toUpperCase(),
        rows: [
          {
            title: 'Different title style',
            showDisclosureIndicator: true,
            titleStyle: {
              color: 'red',
            },
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
