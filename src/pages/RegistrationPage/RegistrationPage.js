import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config'
import styles from './styles';

export default function RegistrationPage({navigation})
{   
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
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

            firebase.database().ref('users/' + uid).set(data).then(() => {
                navigation.navigate('Login', data)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setMessage(errorMessage);
            });
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            setMessage(errorMessage);
          });
    }

    return(
        <View style={styles.container}>
            <ScrollView style={{flex: 1, width: '100%'}} keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/savedatmoneylogo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
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
                <View styles={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </ScrollView>
        </View>
    )
}