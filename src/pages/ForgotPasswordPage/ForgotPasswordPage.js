import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, TouchableHighlight, View, Platform, Modal, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config'
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { Alert } from 'react-native-web';
import { buttons, colors } from '../stdStyles';

export default function RegistrationPage({navigation})
{   
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const doForgotPassword = (e) => 
    {
        e.preventDefault(); // to prevent webpage from realoading on submit each time login is pressed.

        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Email is sent, let the user know and reroute them to login.
            setModalVisible(true);

        }).catch(function (error) {
            // Display error
            var errorMessage = error.message;
            setMessage(errorMessage);
        })

    }

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('Login');
    }


    return(
        <View style={styles.container}>
            <ScrollView style={{flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/savedatmoneylogo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={doForgotPassword}>
                    <Text style={styles.buttonTitle}>Send Email</Text>
                </TouchableOpacity>
                {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}

                {Platform.IOS === 'ios' ?
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                    <View style={styles.modalView}>
                        <Text>Password recovery link successfully sent to email.</Text>
                        <TouchableHighlight style={styles.button} onPress={closeModal}>
                            <Text style={styles.modalButtonTitle}>Ok</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                :
                <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}> 
                    <View style={styles.modalView}>
                        <Text>Password recovery link successfully sent to email.</Text>
                        <TouchableHighlight style={styles.button} onPress={closeModal}>
                            <Text style={styles.modalButtonTitle}>Ok</Text>
                        </TouchableHighlight>
                    </View>
                </WebModal>
            } 
            </ScrollView>
        </View>
    )
}