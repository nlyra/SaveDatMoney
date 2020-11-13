import React, { useState, Component} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../firebase/config';

class EditModal extends Component {
   state = {
      modalVisible: false,
   }
   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }
   
   render() {

      const editTransaction = () => {
         console.log("keyyyy" + this.props.keyyy)
         var updates = {};
         updates['/category'] = "example1";
         updates['/description'] = "example2";
         updates['/cost'] = 123;

         firebase.database().ref('transaction/'+this.props.keyyy).update(updates);

         this.toggleModal(!this.state.modalVisible)
      }   

      return (

         <View style = {styles.container}>
            {Platform.OS === 'ios' ?
            <Modal animationType="slide" transparent={true} visible={modal2Visible} onRequestClose={() => {
            Alert.alert("Modal has been closed.");}}>
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={styles.modalText}>Edit</Text>
                     <TextInput
                           style={styles.input}
                           placeholder='Category'
                           placeholderTextColor="black"
                           // onChangeText={(text) => setCategory(text)}
                           // value={category}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                     />
                     <TextInput
                           style={styles.input}
                           placeholderTextColor="black"
                           placeholder='Description'
                           // onChangeText={(text) => setDescription(text)}
                           // value={description}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                     />
                     <TextInput
                           style={styles.input}
                           placeholderTextColor="black"
                           placeholder='Cost'
                           // onChangeText={(text) => setCost(text)}
                           // value={cost}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                     />
                     <View style={styles.modalButtons}>
                           <TouchableHighlight style={buttons.standard} onPress={closeModal2}>
                              <Text style={styles.buttonTitle}>Cancel</Text>
                           </TouchableHighlight>
                           <TouchableHighlight style={buttons.standard} onPress={editTransaction}>
                              <Text style={styles.buttonTitle}>Save</Text>
                           </TouchableHighlight>
                     </View>
                  </View>
               </View>
            </Modal>
            :
            <WebModal animationType="slide" transparent={true} visible = {this.state.modalVisible} onRequestClose={() => {
               Alert.alert("Modal has been closed.");}}>
                  <View style={styles.centeredView}>
                     <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit</Text>
                        <TextInput
                           style={styles.input}
                           placeholder='Category'
                           placeholderTextColor="black"
                           // onChangeText={(text) => setCategory(text)}
                           // value={category}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                        />
                        <TextInput
                           style={styles.input}
                           placeholderTextColor="black"
                           placeholder='Description'
                           // onChangeText={(text) => setDescription(text)}
                           // value={description}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                        />
                        <TextInput
                           style={styles.input}
                           placeholderTextColor="black"
                           placeholder='Cost'
                           // onChangeText={(text) => setCost(text)}
                           // value={cost}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                        />
                        <View style={styles.modalButtons}>
                           <TouchableHighlight style={buttons.standard} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
                              <Text style={styles.buttonTitle}>Cancel</Text>
                           </TouchableHighlight>
                           <TouchableHighlight style={buttons.standard} onPress={editTransaction}>
                              <Text style={styles.buttonTitle}>Save</Text>
                           </TouchableHighlight>
                        </View>
                     </View>
                  </View>
            </WebModal>
            }
            
            <MaterialCommunityIcons name="pencil-outline" color={colors.warning} size={26} onPress={() => this.toggleModal(true)}/>

         </View>
      )
   }
}
export default EditModal