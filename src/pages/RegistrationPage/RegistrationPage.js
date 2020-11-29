import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, TouchableHighlight, View, Platform, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config'
import WebModal from 'modal-enhanced-react-native-web';
import styles from './styles';
import { useTheme } from 'react-native-paper';

export default function RegistrationPage({navigation})
{   
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('Login');
    }

    /**
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const doRegister = (e) => 
    {
        e.preventDefault(); // to prevent webpage from realoading on submit each time login is pressed.

        // If passwords don't match
        if (password !== confirmPassword) {
            //alert("Passwords don't match.")
            setMessage("Passwords don't match.");
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
            
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            
            // Add data to user's db reference
            firebase.database().ref('users/' + uid).set(data).then(() => {
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setMessage(errorMessage);
            });

            // Send verification email to user
            firebase.auth().currentUser.sendEmailVerification().then(function () {
                // Email sent
                setModalVisible(true);

            });
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            setMessage(errorMessage);
        });
    }
    const { colors } = useTheme();
    return(
        <View style={styles.container}>
            <ScrollView style={{flex: 1, width: '100%'}} keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/savedatmoneylogo.png')}
                />
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text
                    }]}
                    placeholder='Full Name'
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text
                    }]}
                    placeholder='E-mail'
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text
                    }]}
                    placeholderTextColor={colors.gray}
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text
                    }]}
                    placeholderTextColor={colors.gray}
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={doRegister}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={[styles.footerText, {color: colors.text}]}>Already have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>

                {Platform.IOS === 'ios' ?
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                    <View style={styles.modalView}>
                        <Text style={styles.messageText}>Email verification link sent to {email}.</Text>
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
                        <Text style={styles.messageText}>Email verification link sent to {email}.</Text>
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