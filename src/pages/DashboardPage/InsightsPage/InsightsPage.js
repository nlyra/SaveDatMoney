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
import { AreaChart, BarChart, AnimatedProgressCircle, ProgressCircle, Grid, XAxis } from 'react-native-svg-charts';

function InsightsPage({navigation}) {

    const [refresh, setRefresh] = useState("");
    const [date, setDate] = useState(new Date());
    var user = firebase.auth().currentUser;
    var uid;
    var userData = [];

    if (user != null) {
    uid = user.uid;  
    }

    var ref = firebase.database().ref("category");
    ref.orderByChild("date_uid").equalTo(format(date, 'MMMM, yyyy') + "_" + uid).on("child_added", function(snapshot) {
        userData.push({
            ...snapshot.val(),
            key: snapshot.key,
          });
        console.log(userData);
    });

    var expenseData = [], incomeData = [], expenseLabels = [], incomeLabels = [], totalExpense = 0, totalIncome = 0, plannedExpense = 0, plannedIncome = 0;
    for(var i = 0; i < userData.length; i++) {
      if(userData[i].expenseOrIncome == 'expense') {
        expenseData.push(userData[i].spent);
        expenseLabels.push(userData[i].category);
        totalExpense += userData[i].spent;
        plannedExpense += userData[i].planned;
      }
      else if(userData[i].expenseOrIncome == 'income') {
        incomeData.push(userData[i].spent);
        incomeLabels.push(userData[i].category);
        plannedIncome += userData[i].planned;
        totalIncome += userData[i].spent;
      }
    }
    var expenseProgress = totalExpense/plannedExpense, incomeProgress = totalIncome/plannedIncome;

   

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

      var labels = "";
      for(var i = 0; i < expenseLabels; i++) {
        labels += expenseLabels[i]+" ";
      }
      for(var i = 0; i < incomeLabels; i++) {
        labels += incomeLabels+" ";
      }

      return (        
        <View style={styles.mainContainer}>
          <View style={{marginTop: 15}}>
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)}/>
          </View>
          <ScrollView>
          
          <View style = {{flexDirection: "row"}}>
              <View style={{flex:1}}>
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Expense{"\n\n"}</Text>
                <ProgressCircle
                  style = {{height: 300}}
                  progress = {expenseProgress}
                  progressColor = {'rgb(255, 55, 55)'}
                  strokeWidth = {10}
                  backgroundColor = {'rgb(155, 155, 155)'}
                />
                <Text style={{textAlign: 'center', fontSize: 20}}>{"\n\n"}You have spent {expenseProgress.toFixed(2)*100}% of what you planned.{"\n\n"}</Text>
              </View>



              <View style={{flex:1}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Income{"\n\n"}</Text>
                <ProgressCircle
                  style = {{height: 300}}
                  progress = {incomeProgress}
                  progressColor = {'rgb(55, 255, 55)'}
                  strokeWidth = {10}
                  backgroundColor = {'rgb(155, 155, 155)'}
                  label = {"test"}
                />
                <Text style={{textAlign: 'center', fontSize: 20}}>{"\n\n"}You have earned {incomeProgress.toFixed(2)*100}% of what you planned.{"\n\n"}</Text>
                
              </View>
            </View>

          <View style = {{flexDirection: "row"}}>
            <View style={{flex:1}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Expenses Visualized</Text>
              <BarChart 
                style = {{height: 300, padding: 20}}
                data = {expenseData}                
                svg = {{ fill: 'rgb(255, 55, 55)' }}          
                contentInset = {{top: 30, bottom: 30}}
                yMax = {1000}
                gridMin = {0}
              >
                  <Grid/>
              </BarChart>
              <XAxis
                    style = {{height: 300, padding: 20}}
                    data={expenseLabels}
                    formatLabel={(value, index) => "    "+expenseLabels[index] + ": $" + expenseData[index]}
                    contentInset={{ left: 40, right: 40 }}
                    svg={{ fontSize: 16, fill: 'black', fontFamily: 'Arial' }}
                />
            </View>

            <View style={{flex:1}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Income Visualized</Text>
              <BarChart 
                style = {{height: 300, padding: 20}}
                data = {incomeData}
                svg = {{ fill: 'rgb(55, 255, 55)' }}
                contentInset = {{top: 30, bottom: 30}}
                yMax = {1000}
                gridMin = {0}
              >
                  <Grid />
              </BarChart>
              <XAxis
                    style={{ marginHorizontal: -10, padding: 20 }}
                    data={incomeLabels}
                    formatLabel={(value, index) => "    "+incomeLabels[index] + ": $" + expenseData[index]}
                    contentInset={{ left: 50, right: 40 }}
                    svg={{ fontSize: 16, fill: 'black', fontFamily: 'Arial' }}

                />
            </View>
            <Text>{labels}</Text>
          </View>
            
          </ScrollView>
        </View>

      )
}
  

export default InsightsPage;