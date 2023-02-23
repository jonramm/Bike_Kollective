import * as React from 'react';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TitleScreen from '../pages/TitleScreen';
import ResetPassword from '../pages/ResetPassword';

const Stack = createStackNavigator();

const AuthStack = () => {

  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(false);
    }, 3 * 1000)
  }, []);

  if (showTitle) {
    return <TitleScreen />
  }

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
      </Stack.Navigator>
  )
}

export default AuthStack;