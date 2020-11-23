import React, { useState} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal} from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker';

import { VictoryPie, VictoryTooltip, VictoryLabel, VictoryChart, VictoryScatter, VictoryTheme } from "./Victory";

function InsightsPage() {

    const [date, setDate] = useState(new Date());
    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    if (user != null) {
    uid = user.uid;  
    }

    /* Get data from the database */
    var ref = firebase.database().ref("transaction");
    ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
        userData.push({
            ...snapshot.val(),
            key: snapshot.key,
          });
        console.log(userData);
    });

    var data = [];
    for(var i = 0; i < userData.length; i++) {
      data.push({
        x: userData[i].category,
        y: userData[i].cost
      });
      console.log(data);
      console.log("this is data ^");
      console.log(userData[i].category)
    }
    
    console.log(data);

    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/>
      </View>

      <View style={styles.graphContainer}>
      <VictoryPie
          style={{
            data: {
              stroke: ({ datum }) => (datum.y > 9 ? "black" : "green"),
              opacity: ({ datum }) => (datum.y > 9 ? 1 : 0.4)
            }
          }}
          data={data}
        />
      </View>
    </View>
  )

  
};

export default InsightsPage;

/* */