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
    var userData = [];
    var ref = firebase.database().ref("category");
    ref.orderByChild("dateuid").equalTo(format(date, 'MMMM, yyyy') + "" + uid).on("child_added", function(snapshot) {
         userData.push({
             ...snapshot.val(),
             key: snapshot.key,
           });
    });

    console.log("please help");

    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/>
        
          <VictoryPie
          style={{
            data: {
              stroke: ({ datum }) => (datum.y > 75 ? "black" : "none"),
              opacity: ({ datum }) => (datum.y > 75 ? 1 : 0.4)
            }
          }}
          data={[
            { x: "Food", y: 62 },
            { x: "Rent", y: 91 },
            { x: "Tuition", y: 55 },
          {x: "Miscellaneous", y: 55 }
          ]}
        />
      </View>
    </View>
  )

  
};

export default InsightsPage;

/* */