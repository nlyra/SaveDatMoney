import React, { useState, Component} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { buttons, colors } from '../stdStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../firebase/config';
import { isThisSecond } from 'date-fns';

class DeleteModal extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         modalVisible: false,
      }
   }

   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
   
   render() {

      const deleteTransaction = () => {
         console.log("keyyyy" + this.props.itemKey)

         firebase.database().ref("/transaction/"+this.props.itemKey).remove();
         this.toggleModal(!this.state.modalVisible)
      }

      return (

         <View style = {styles.container}>
            {Platform.OS === 'ios' ?
            <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
            Alert.alert("Modal has been closed.");}}>
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={styles.modalText}>Delete</Text>
                     <View style={styles.modalButtons}>
                        <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                           <Text style={styles.buttonTitle}>Yes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={buttons.standard} color={colors.primary} onPress={deleteTransaction}>
                           <Text style={styles.buttonTitle}>Cancel</Text>
                        </TouchableHighlight>
                     </View>
                  </View>
               </View>
            </Modal>
            :
            <WebModal animationType="slide" transparent={true} visible = {this.state.modalVisible} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
                        <View style={styles.modalButtons}>
                            <View style={{flexDirection: 'row', justifyContent: "center", alignItems: 'center'}}>
                                <TouchableHighlight style={buttons.standard} color={colors.primary} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                                    <Text style={styles.modalButtonTitle}>Cancel</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={buttons.standard} color={colors.danger} onPress={deleteTransaction}>
                                    <Text style={styles.modalButtonTitle}>Yes</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
            </WebModal>
            }
            
            {Platform.OS === 'ios' ?
                <View style={{ backgroundColor: 'red', justifyContent: 'center' }}>
                    <Animated.Text
                        style={{
                        color: 'white',
                        paddingHorizontal: 10,
                        fontWeight: '600',
                        transform: [{ scale }]
                        }}onPress={() => deleteTransaction(item.key)}>
                        Delete
                    </Animated.Text>
                </View>
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