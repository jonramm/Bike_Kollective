import React, {useState, useEffect, useContext} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import * as WebBrowser from 'expo-web-browser';
import { SocialIcon } from 'react-native-elements';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

WebBrowser.maybeCompleteAuthSession();

const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {register, googleAuth} = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
        >
          <View style={styles.inputContainer}>
            <FormInput
              value={email}
              placeholderText='Email'
              onChangeText={userEmail => setEmail(userEmail)}
              autoCapitalize='none'
              keyboardType='email-address'
              autoCorrect={false} 
              labelValue={undefined}            
            />
            <FormInput
              value={password}
              placeholderText='Password'
              onChangeText={userPassword => setPassword(userPassword)}
              secureTextEntry={true} 
              labelValue={undefined}            
            />
            <FormInput
              value={firstName}
              placeholderText='First Name'
              onChangeText={userFirstName => setFirstName(userFirstName)}
              autoCapitalize='none'
              autoCorrect={false} 
              labelValue={undefined}            
            />
            <FormInput
              value={lastName}
              placeholderText='Last Name'
              onChangeText={userLastName => setLastName(userLastName)}
              autoCapitalize='none'
              autoCorrect={false} 
              labelValue={undefined}            
            />
          </View>
    
          <View style={styles.buttonContainer}>

            <FormButton 
              buttonTitle='Register' 
              buttonStyle={[styles.button]} 
              textStyle={styles.buttonText} 
              onPress={() => register(email, password, firstName, lastName)} 
            />
            <Text style={styles.text}>HAVE AN ACCOUNT?</Text>
            <FormButton 
              buttonTitle='LOGIN' 
              buttonStyle={[styles.buttonLink]} 
              textStyle={styles.buttonLinkText} 
              onPress={() => navigation.navigate('Login')} 
            />

            <Text style={styles.text}>Or continue with</Text>
            <SocialIcon
              type='google'
              iconSize={25}
              onPress={() => googleAuth()} 
            />
      
          </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#E7FAF4',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: '#00BFA6',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonLink: {
    // Placeholder
  },
  buttonLinkText: {
    color: '#00BFA6'
  },
  text: {
    color: '#3F3D53',
    marginTop: 10
  }
});

export default Register;
