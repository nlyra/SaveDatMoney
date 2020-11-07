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
    const doForgotPassword = (e) => 
    {
        e.preventDefault(); // to prevent webpage from realoading on submit each time login is pressed.

 
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
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {message ? <Text style={{ color: 'red' }}>{message}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={doForgotPassword}>
                    <Text style={styles.buttonTitle}>Send Email</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}