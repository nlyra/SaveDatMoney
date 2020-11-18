import React, { useState, Component} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { buttons, colors } from '../stdStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../firebase/config';
import { isThisSecond } from 'date-fns';
import { Divider } from 'react-native-paper';


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

      const deleteTransaction = () => {
         console.log("keyyyy" + this.props.itemKey)

         firebase.database().ref("/transaction/"+this.props.itemKey).remove();
         this.toggleModal(!this.state.modalVisible)
      }

      const deleteTransaction2 = () => {
         console.log("keyyyy" + this.props.itemKey)

         firebase.database().ref("/transaction/"+this.props.itemKey).remove();
         this.toggleModal2(false)
      }

      return (

         <View style = {styles.container}>

            {Platform.OS === 'ios' ?
            <View style={styles.centeredView}> 
               <Modal animationType="slide" transparent={true} visible={this.state.modalVisible2} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                  <View style={styles.centeredView}>
                     <View style={styles.modalView}>
                        <Text style={{color: "black", fontSize: 16, marginBottom: 10, fontWeight: "bold", textAlign: "center",}}>Are you sure you want to delete this item?</Text>
                        <Divider></Divider> 
                        <View style={styles.modalButtons}>
                           <View style={{marginTop: 10, flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                              <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} color={colors.primary} onPress={() => {this.toggleModal2(!this.state.modalVisible2)}}>
                                 <Text style={styles.modalButtonTitle}>Cancel</Text>
                              </TouchableHighlight>
                              <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={deleteTransaction2}>
                                 <Text style={styles.modalButtonTitle}>Yes</Text>
                              </TouchableHighlight>
                           </View>
                        </View>
                     </View>
                  </View>
               </Modal>
            </View>
            :
            <WebModal animationType="slide" transparent={true} visible = {this.state.modalVisible} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{color: "black", fontSize: 16, marginBottom: 10, fontWeight: "bold", textAlign: "center",}}>Are you sure you want to delete this item?</Text>
                        <Divider></Divider> 
                        <View style={styles.modalButtons}>
                            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                                <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} color={colors.primary} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                                    <Text style={styles.modalButtonTitle}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={deleteTransaction}>
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
