import React, {useState, useEffect, useContext} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Text } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const ResetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const {resetPass} = useContext(AuthContext);

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
          </View>

          <View style={styles.buttonContainer}>
            
            <FormButton 
              buttonTitle='Reset Password' 
              buttonStyle={styles.button} 
              textStyle={styles.buttonText} 
              onPress={() => {
                resetPass(email);
                alert("Password reset link sent. Please check your email.");
              }} 
            />
            <FormButton 
              buttonTitle='BACK TO LOGIN' 
              buttonStyle={[styles.buttonLink]} 
              textStyle={styles.buttonLinkText} 
              onPress={() => navigation.navigate('Login')} 
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

export default ResetPassword;
