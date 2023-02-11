import React, {useState, useEffect, useContext} from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, register} = useContext(AuthContext);

    // TO DO: Create separate page for registration and collect first_name and last_name
    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
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
          </View>
    
          <View style={styles.buttonContainer}>

            <FormButton 
              buttonTitle='Login' 
              buttonStyle={styles.button} 
              textStyle={styles.buttonText} 
              onPress={() => login(email, password)} 
            />
            <FormButton 
              buttonTitle='Register' 
              buttonStyle={[styles.button, styles.buttonOutline]} 
              textStyle={styles.buttonOutlineText} 
              onPress={() => register(email, password)} 
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
    backgroundColor: '#0782F9',
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
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Login;
