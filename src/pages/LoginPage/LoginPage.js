import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { colors, padding, fonts, buttons } from '../stdStyles';

import { firebase } from '../../firebase/config'

export default function LoginPage({navigation})
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    const onFooterLinkPress2 = () => {
        navigation.navigate('ForgotPassword')
    }

    /**
     *
     * @param {React.FormEvent<HTMLFormElement>} e
     */
    const doLogin = (e) => {

        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {

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
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            setMessage(errorMessage);
        })
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
            </ScrollView>
        </View>
    )
}
