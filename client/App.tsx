import React from "react";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddBike from "./pages/AddBike";
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Map"
          component={MapPage}
        />
        <Stack.Screen
          name="AddBike"
          component={AddBike}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

