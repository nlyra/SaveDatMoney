import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../firebase/config';
import styles from '../styles';
import ChartWrapper from './ChartWrapper'

class InsightsPage extends React.Component {
  render() {
    return (
      <div>
        <ChartWrapper/>
      </div>
    )
  }
};

export default InsightsPage;