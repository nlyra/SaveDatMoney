import React, { useState, useEffect, PureComponent } from 'react';
import { Text, TouchableOpacity, View, Button, Alert, ScrollView, 
    TouchableHighlight, TextInput, Platform, Modal} from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import {format} from 'date-fns'; 
import MonthPicker from '../MonthPicker';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { AreaChart, BarChart, AnimatedProgressCircle, ProgressCircle, Grid, YAxis } from 'react-native-svg-charts';

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
    
    
      const data2 = [ {value: 50, label: "Food",},
                      {value: 30, label: "Shopping",},
                      {value: 100, label: "Clothes",},
                      {value: 25, label: "Gas",},
                      {value: 150, label: "Misc",},]
      const chData2 = [20, 20, 30, 15, 85, 35, 51]

      return (        
        <View style={styles.mainContainer}>
          <View>
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/>
          </View>
          <ScrollView>
          
          <View style = {{flexDirection: "row"}}>
              <View style={{flex:1}}>
                <ProgressCircle
                  style = {{height: 300}}
                  progress = {.7}
                  progressColor = {'rgb(255, 55, 55)'}
                  strokeWidth = {10}
                  backgroundColor = {'rgb(155, 155, 155)'}
                />
                
              </View>

              <View 
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Text>Test</Text>
              </View>

              <View style={{flex:1}}>
                <ProgressCircle
                  style = {{height: 300}}
                  progress = {.4}
                  progressColor = {'rgb(55, 255, 55)'}
                  strokeWidth = {10}
                  backgroundColor = {'rgb(155, 155, 155)'}
                  label = {"test"}
                />
                
              </View>

              <View 
                style={{

                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Text>Test</Text>
              </View>
            </View>




          <View style = {{flexDirection: "row"}}>
            <View style={{flex:1}}>
              <BarChart 
                style = {{height: 300, padding: 20}}
                data = {chData2}                
                svg = {{ fill: 'rgb(255, 55, 55)' }}          
                contentInset = {{top: 30, bottom: 30}}
                spacingOuter = {0.3}
                yMax = {1000}
              >
                  <Grid/>
              </BarChart>
            </View>

            <View style={{flex:1}}>
              <BarChart 
                style = {{height: 300, padding: 20}}
                data = {chData2}
                svg = {{ fill: 'rgb(55, 255, 55)' }}
                contentInset = {{top: 30, bottom: 30}}
                spacingOuter = {0.3}
                yMax = {1000}
              >
                  <Grid />
              </BarChart>
            </View>
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
  

export default InsightsPage;