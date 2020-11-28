import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableHighlight, View,
         Switch, Platform, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { firebase } from '../../../firebase/config';
import styles from './styles';
import { buttons, colors } from '../../stdStyles';
import WebModal from 'modal-enhanced-react-native-web';
import { TouchableRipple, useTheme } from 'react-native-paper';
import {AuthContext} from '../../../../components/context'


export default function SettingsPage({navigation})
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    const changeTitle = () => {
      navigation.setOptions({ title: 'Settings' });
    };

    var user = firebase.auth().currentUser;
    var uid;

    const changePassword = () => {
      if (password !== confirmPassword){
          setMessage('Passwords do not match');
          return;
      }
      user.updatePassword(password);
      setModalVisible(!modalVisible);
    };

    const changeEmail = () => {
      user.updateEmail(email);
    };

    const changeName = () => {
      user.updateProfile({displayName: name})
    };

    const saveChanges = () => {
      if (name !== '')
        changeName();
      if (email !== '')
        changeEmail();
    };

    const closeModal = () => {
        setModalVisible(!modalVisible);
    };

    const doLogout = () => {
      navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
      });
    };

    if (user != null) {
      uid = user.uid;
    };
    const {toggleTheme} = React.useContext(AuthContext);
    const paperTheme = useTheme();
    const { colors } = useTheme();

    return (
      <View style={styles.mainContainer}>
        {Platform.OS === 'ios' ?
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
            <View style={styles.centeredView}>
            <View style={[styles.modalView, {
                backgroundColor: colors.background
              }]}>
                <View style={[styles.centeredView, {
                  backgroundColor: colors.background
                }]}>
                  <Text style={styles.modalText2}>Change Password</Text>
                  <TextInput
                    style={[styles.input, {
                      backgroundColor: colors.surface
                    }]}
                    placeholderTextColor={colors.gray}
                    placeholder='New Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={[styles.input, {
                      backgroundColor: colors.surface
                    }]}
                    placeholderTextColor={colors.gray}
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.centeredView}>
                  {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
                </View>
                <View style={styles.modalButtons}>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={changePassword}>
                    <Text style={styles.buttonTitle}>Save</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[{marginRight: '10%'}, buttons.standard]} onPress={closeModal}>
                    <Text style={styles.buttonTitle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
          :
          <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, {
                backgroundColor: colors.background
              }]}>
                <View style={[styles.centeredView, {
                  backgroundColor: colors.background
                }]}>
                  <Text style={styles.modalText2}>Change Password</Text>
                  <TextInput
                    style={[styles.input, {
                      backgroundColor: colors.surface
                    }]}
                    placeholderTextColor={colors.gray}
                    placeholder='New Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={[styles.input, {
                      backgroundColor: colors.surface
                    }]}
                    placeholderTextColor={colors.gray}
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.centeredView}>
                  {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
                </View>
                <View style={styles.modalButtons}>
                  <TouchableHighlight style={buttons.standard} onPress={changePassword}>
                    <Text style={styles.buttonTitle}>Save</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={buttons.standard} onPress={closeModal}>
                    <Text style={styles.buttonTitle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </WebModal>
        }
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} scrollEnabled={false}>
          <View style={styles.centeredView}>
            <View style={[styles.settingsModal, {
              backgroundColor: colors.background
            }]}>
              <Text style={styles.modalTitle}>Account Settings</Text>
              <Text style={styles.separator}></Text>
              <View style={styles.setting}>
                <Text style={styles.modalText}>Name</Text>
                <TextInput
                  style={[styles.textStyle, {
                    backgroundColor: colors.surface }]}
                  placeholderTextColor={colors.gray}
                  placeholder={user.displayName}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
              <Text style={styles.separator}></Text>
              <View style={styles.setting}>
                <Text style={styles.modalText}>Email</Text>
                <TextInput
                  style={[styles.textStyle, {
                    backgroundColor: colors.surface }]}
                  placeholderTextColor={colors.gray}
                  placeholder={user.email}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
              </View>
              <Text style={styles.separator}></Text>
              <View style={styles.setting}>
                <Text style={styles.modalText}>Password</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Text style={[styles.textStyle, {
                      color: colors.gray
                    }]}>*******</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.separator}></Text>
              <ScrollView contentContainerStyle={styles.scrollView} scrollEnabled={false}>
                <Text style={styles.modalText}>Dark Mode</Text>
                <TouchableRipple style={styles.centeredView} activeOpacity='1' onPress={() => {toggleTheme()}}>
                  <Switch
                    style={styles.switch}
                    value={paperTheme.dark}
                  />
                </TouchableRipple>
              </ScrollView>
              <Text style={styles.separator}></Text>
              <View style={styles.bottomContainer}>
                <TouchableHighlight style={[styles.saveButton, {marginBottom: 15}]} onPress={saveChanges}>
                  <Text style={styles.buttonTitle}>Save Changes</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.logoutButton} onPress={doLogout}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
}
