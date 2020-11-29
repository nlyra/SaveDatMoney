import React, { useState, Component} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styles from '../styles';
import { buttons, colors } from '../../stdStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../firebase/config';
import { isThisSecond } from 'date-fns';
import { Divider } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'

class DeleteModal extends Component {
   constructor(props){
      super(props);
      this.state = {
         modalVisible: false,
         modalVisible2: props.visible
      }
   }

   
   toggleModal(visible) {
      this.setState({ modalVisible: visible});
   }

   toggleModal2(visible) {
      this.setState({ modalVisible2: visible});
   }


   render() {

      const _onPress = () => {
         console.log("getting called");
         this.props.onPressModelItem()
       }

      const deleteCategory = () => {
         console.log("keyyyy" + this.props.itemKey)

         firebase.database().ref("/category/"+this.props.itemKey).remove();
         _onPress()
         this.toggleModal(!this.state.modalVisible)
      }

      const deleteCategory2 = () => {
         console.log("keyyyy" + this.props.itemKey)

         firebase.database().ref("/category/"+this.props.itemKey).remove();
         _onPress()
         this.toggleModal2(false)
      }

      return (

         <View style = {styles.modalContainer}>
            {Platform.OS === 'ios' ?
               <Modal animationType="slide" transparent={true} visible={this.state.modalVisible2} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                  <View style={{alignItems: 'center',justifyContent: 'center', paddingTop:140}}>
                     <View style={{width: '90%',margin: 30,backgroundColor: "white",borderRadius: 20,padding: 35,
                     alignItems: 'stretch',justifyContent: 'center',shadowColor: "#000",shadowOffset: {width: 0,height: 2},shadowOpacity: 0.75,shadowRadius: 4.84,elevation: 5}}>
                        <Text style={{color: "black", fontSize: 16, marginBottom: 10, fontWeight: "bold", textAlign: "center",}}>Are you sure you want to delete this category?</Text>
                        <Divider></Divider> 
                        <View style={styles.modalButtons}>
                           <View style={{marginTop: 10, flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                              <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} color={colors.green} onPress={() => {this.toggleModal2(!this.state.modalVisible2)}}>
                                 <Text style={styles.modalButtonTitle}>Cancel</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={deleteCategory2}>
                                 <Text style={styles.modalButtonTitle}>Yes</Text>
                              </TouchableHighlight>
                           </View>
                        </View>
                     </View>
                  </View>
               </Modal>
            :
            <WebModal animationType="slide" transparent={true} visible = {this.state.modalVisible} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                  <View style={styles.centeredView}>
                  <View style={{marginTop: -80, width: '50%',margin: 30,backgroundColor: "white",borderRadius: 20,padding: 35,
                     alignItems: 'stretch',justifyContent: 'center',shadowColor: "#000",shadowOffset: {width: 0,height: 2},shadowOpacity: 0.75,shadowRadius: 4.84,elevation: 5}}>
                        <Text style={{color: "black", fontSize: 16, marginBottom: 10, fontWeight: "bold", textAlign: "center",}}>Are you sure you want to delete this category?</Text>
                        <Divider></Divider> 
                        <View style={styles.modalButtons}>
                            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                                <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} color={colors.green} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                                    <Text style={styles.modalButtonTitle}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={deleteCategory}>
                                    <Text style={styles.modalButtonTitle}>Yes</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                  </View>
            </WebModal>
            
            }
            {Platform.OS === 'ios' ?
            null
            :
            <View style={[{justifyContent: 'space-between'}, {padding: 0}, {flex: 0}]}>
               <MaterialCommunityIcons name="trash-can-outline" color={colors.danger} size={26} onPress={() => this.toggleModal(true)}/>
            </View>
            }
         </View>
         
      )
   }
}
export default DeleteModal
