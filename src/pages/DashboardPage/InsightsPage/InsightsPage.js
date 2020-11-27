import React, { useState, useEffect, PureComponent } from 'react';
import { Text, TouchableOpacity, View, Button, Alert, ScrollView, 
    TouchableHighlight, TextInput, Platform, Modal} from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker';
//import { PieChart, Pie, Sector, Cell } from 'recharts';
//import { VictoryPie, VictoryTooltip, VictoryLabel, VictoryChart, VictoryScatter, VictoryTheme } from "./Victory";
import * as shape from 'd3-shape';
import { AreaChart, BarChart, ProgressCircle, Grid } from 'react-native-svg-charts';

function InsightsPage({navigation}) {

    const [refresh, setRefresh] = useState("");
    const [date, setDate] = useState(new Date());
    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    if (user != null) {
    uid = user.uid;  
    }

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
    }


    console.log("Data for pie chart: ");
    console.log(data);

    var maxNum = 0;
    var sum = 0, avg = 0;
    var maxCat;
    for (var i = 0; i < data.length; i++) {
        if (data[i].y > maxNum) {
            maxCat = data[i].x;
            maxNum = data[i].y;
        }
        sum = parseInt(sum) + parseInt(data[i].y);
    }
    console.log("the largest category is ");
    console.log(maxCat);

    avg = data.length > 0 ? (sum/data.length).toFixed(2) : 0;

    useEffect(() => {
      // Interval to update count
      // Subscribe for the focus Listener
      const unsubscribe = navigation.addListener('blur', () => {
          console.log("Blur")
          setRefresh({});
      });
      const first = navigation.addListener('focus', () => {
        console.log("Focus")
        setRefresh({});
    });

      const _onPressModelItem = () => {
        setRefresh({})
    }
  
      return () => {
          // Unsubscribe for the focus Listener
          unsubscribe;
      };
      }, [navigation]);
    
      /*<View style={styles.graphContainer}>
        { data.length > 0 ?
          <VictoryPie
            style={{
                labels: {
                    fill: "white",
                    fontSize: 5
                },
                data: {
                    stroke: ({ datum }) => ("black"),
                }
            }}
          data={data}
          height={200}
          labelRadius={5}
          sortKey = "y"
          />
          
          :
          <Text>
            Nothing to show yet
          </Text>
        }*/

        /*<AreaChart
            style={{ height: 200 }}
            data = {chData}
            contentInset = {{top: 30, bottom: 30}}
            curve = { shape.curveNatural }
            svg = {{ fill: 'rgba(134, 55, 244, 0.8)' }}
          >
            <Grid />
          </AreaChart>*/

          /*<BarChart 
              style = {{ height: 200 }}
              data = {chData}
              svg = {{ fill }}
              contentInset = {{top: 30, bottom: 30}}
            >
                <Grid />
            </BarChart>*/
    
    
      const chData = [50, 10, 40, 95, 85, 35, 53]
      const fill = 'rgb(135, 55, 230)'

      return (        
        <View style={styles.mainContainer}>
          <View>
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/>
          </View>
          <ScrollView>
          
          <View>
            <ProgressCircle
              style = {{height: 300}}
              progress = {.7}
              progressColor = {'rgb(255, 55, 55)'}
            />

            <ProgressCircle
              style = {{height: 300}}
              progress = {.3}
              progressColor = {'rgb(55, 255, 55)'}
            />
          </View>
          

          
          {
            data.length > 0 ?
            <Text>
              You have spent the most on {maxCat}.
              The average money you have spent per transaction is {avg}.
              SAVE THAT MONEY BOIIIII!!!
            </Text>
            :
            null
          }
          </ScrollView>
        </View>

      )
}


/*
const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'random', value: 100 },
  { name: 'random2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


    return (
      <PieChart width={400} height={400}>
        <Pie data={data01} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
        <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
      </PieChart>
    );
}
*/
  

export default InsightsPage;