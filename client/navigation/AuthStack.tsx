import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  )
}

export default AuthStack;