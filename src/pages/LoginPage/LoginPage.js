import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, TouchableHighlight, View, Platform, Modal} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { firebase } from '../../firebase/config';
import WebModal from 'modal-enhanced-react-native-web';

export default function LoginPage({navigation})
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onFooterLinkPress = () => {
        navigation.navigate('Registration');
    }
    const onFooterLinkPress2 = () => {
        navigation.navigate('ForgotPassword');
    }

    const resendVerificationLink = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification();
        });

        setModalVisible(false);
    }

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const doLogin = (e) => {

        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {

            const user = firebase.auth().currentUser;
            
            if (user.emailVerified)
            {
                const uid = response.user.uid
                const usersRef = firebase.database().ref('users/' + uid);
    
                usersRef.once('value').then(function(snapshot) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Budget' }],
                    });
                    //navigation.navigate('Dashboard', snapshot.val());
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    setMessage(errorMessage);
                })
            }
            else
            {
                setModalVisible(true);
            }

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setMessage(errorMessage);
        });
        
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={doLogin}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
                <View style={styles.footerView}>
                    <Text onPress={onFooterLinkPress2} style={styles.footerLink}>Forgot Password?</Text>
                </View>

                {Platform.OS === 'ios' ?
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                    <View style={styles.modalView}>
                    <Text style={styles.messageText}>Please verifiy your email before signing in.</Text>
                        <View style={styles.insideModalView}>
                            <TouchableHighlight style={styles.button} onPress={resendVerificationLink}>
                                <Text style={styles.modalButtonTitle}>Resend Link</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.button} onPress={() => {setModalVisible(false)}}>
                                <Text style={styles.modalButtonTitle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                :
                <WebModal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}> 
                    <View style={styles.modalView}>
                    <Text style={styles.messageText}>Please verifiy your email before signing in.</Text>
                        <View style={styles.insideModalView}>
                            <TouchableHighlight style={styles.modalButton} onPress={resendVerificationLink}>
                                <Text style={styles.modalButtonTitle}>Resend Link</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.modalButton} onPress={() => {setModalVisible(false)}}>
                                <Text style={styles.modalButtonTitle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </WebModal>
            } 

            </ScrollView>
        </View>
    )
}
