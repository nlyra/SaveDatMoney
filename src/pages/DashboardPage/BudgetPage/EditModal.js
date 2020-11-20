import React, { useState, Component} from 'react';
import { Text, TouchableOpacity, View, Button, Alert, FlatList, TouchableHighlight, TextInput, Platform, Modal, Animated} from 'react-native';
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../firebase/config';
import { isThisSecond } from 'date-fns';

export default class EditModal extends Component {
   constructor(props){
      super(props);
      this.state = {
         category: props.item.category,
         planned: props.item.planned,
         modalVisible: false,
         modalVisible2: props.visible
      }
      console.log("planned is" + this.state.planned);
   }

   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }

   toggleModal2(visible) {
      this.setState({ modalVisible2: visible });
   }
   
   render() {

      const editTransaction = () => {
         console.log("keyyyy" + this.props.itemKey)
         var updates = {};
         updates['/category'] = this.state.category;
         updates['/planned'] = parseInt(this.state.planned);

         firebase.database().ref('category/'+this.props.itemKey).update(updates);
         this.forceUpdate();
         console.log("edittttt");
         _onPress()
         this.toggleModal(false)
      }

      const editTransaction2 = () => {
         console.log("keyyyy" + this.props.itemKey)
         var updates = {};
         updates['/category'] = this.state.category;
         updates['/planned'] = parseInt(this.state.planned);

         firebase.database().ref('category/'+this.props.itemKey).update(updates);
         this.forceUpdate();
         _onPress()
         this.toggleModal2(false)
      }

      const _onPress = () => {
         console.log("getting called");
         this.props.onPressModelItem()
      }

      return (

         <View style = {styles.modalContainer}>
            {Platform.OS === 'ios' ?
            <Modal animationType="slide" transparent={true} visible={this.state.modalVisible2} onRequestClose={() => {
            Alert.alert("Modal has been closed.");}}>
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={styles.modalText}>Edit Category</Text>
                     <TextInput
                        style={styles.input}
                        placeholder='Category'
                        placeholderTextColor="black"
                        onChangeText={(text) => this.setState({category: text})}
                        value={this.state.category}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                     />
                     <TextInput
                        style={styles.input}
                        placeholderTextColor="black"
                        placeholder='Planned'
                        onChangeText={(text) => this.setState({planned: text})}
                        value={this.state.planned.toString()}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                     />
                     <View style={styles.modalButtons}>
                        <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={() => {this.toggleModal2(!this.state.modalVisible2)}}>
                           <Text style={styles.buttonTitle}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={buttons.standard} onPress={editTransaction2}>
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
                        <Text style={styles.modalText}>Edit Category</Text>
                        <TextInput
                           style={styles.input}
                           placeholder='Category'
                           placeholderTextColor="black"
                           onChangeText={(text) => this.setState({category: text})}
                           value={this.state.category}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                        />
                        <TextInput
                           style={styles.input}
                           placeholderTextColor="black"
                           placeholder='Planned'
                           onChangeText={(text) => this.setState({planned: text})}
                           value={this.state.planned.toString()}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                        />
                        <View style={styles.modalButtons}>
                           <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
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
            {Platform.OS === 'ios' ?
            null
            :
            <View style={[{justifyContent: 'space-between'}, {padding: 0}, {flex: 0}]}>
               <MaterialCommunityIcons name="pencil-outline" color={colors.warning} size={26} onPress={() => this.toggleModal(true)}/>
            </View>
            }
         </View>
         
      )
   }
}
