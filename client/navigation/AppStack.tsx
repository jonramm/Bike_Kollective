import * as React from 'react';
import { useContext, useState, useRef } from 'react';
import { LogBox, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapPage from '../pages/MapPage';
import AddBike from '../pages/AddBike';
import BikeInfo from '../pages/BikeInfo';
import ListBikes from '../pages/ListBikes';
import RateTrip from '../pages/RateTrip';
import ReturnBike from '../pages/ReturnBike';
import Profile from '../pages/Profile';
import Waiver from '../components/Waiver';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {

  // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  // We're not currently using state persistence so I'm suppressing this error,  
  // but it would be cool if we eventually persisted the countdown timer.
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state', 
  ]);

  const timerRef = useRef(null);

  // This creates a timer object that runs in the background.
  // I'm storing it in a state variable so we can start it when
  // we begin a ride and stop it when we return a bike.
  const startTimer = () => {
    let timer = null;
    // Change the second parameter of setTimeout to lengthen
    // the timer.
    timerRef.current = setTimeout(() => {
        Alert.alert('Please return your bike!');
        clearTimeout(timerRef.current);
      }, 10 * 1000);

  }

  // Deletes the timer instance
  const endTimer = () => {
    clearTimeout(timerRef.current);
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Search') {
            return <Icon name='search' size={20} color={'#00BFA6'}/>;
          } else if (route.name === 'Add') {
            return <Icon name='plus' size={20} color={'#00BFA6'}/>;
          } else if (route.name === 'Booking') {
            return <Icon name='book' size={20} color={'#00BFA6'}/>;
          } else if (route.name === 'Profile') {
            return <Icon name='user' size={20} color={'#00BFA6'}/>;
          } else if (route.name === 'Logout') {
            return <Icon name='sign-out' size={20} color={'#00BFA6'}/>;
          }
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        unmountOnBlur: true, // reloads the tab screens every time you click on a tab
      })}
    >
      <Tab.Screen 
        name="Search" 
        component={SearchNav}
        initialParams={{
          startTimer: startTimer
        }}  
      />
      <Tab.Screen 
        name="Add" 
        component={AddNav} 
      />
      <Tab.Screen 
        name="Booking" 
        component={BookingNav} 
        initialParams={{
          endTimer: endTimer
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNav} 
      />
      <Tab.Screen 
        name="Logout" 
        component={LogoutNav} 
      />
    </Tab.Navigator>
  )
}

const SearchNav = ({route}) => {
  const startTimer = route.params.startTimer;

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Map" 
          component={MapPage} 
        />
        <Stack.Screen 
          name="List Bikes" 
          component={ListBikes}
        />
        <Stack.Screen 
          name="Bike Info" 
          component={BikeInfo}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }}
          initialParams={{
            startTimer: startTimer
          }}
        />
      </Stack.Navigator>
  )
}

const AddNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="Add Bike" 
        component={AddBike}
      />
      <Stack.Screen 
        name="Release Waiver"
        component={Waiver}
      />
    </Stack.Navigator>
  )
}

const BookingNav = ({route}) => {
  const endTimer = route.params.endTimer;

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Return Bike" 
          component={ReturnBike}
          initialParams={{
            endTimer: endTimer
          }}
        />
        <Stack.Screen 
          name="Rate Trip" 
          component={RateTrip}
        />
      </Stack.Navigator>
  )
}

const ProfileNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="User Profile" 
        component={Profile}
      />
      <Stack.Screen 
        name="Accident Waiver"
        component={Waiver}
      />
    </Stack.Navigator>
  )
}

const LogoutNav = () => {
  const {logout} = useContext(AuthContext);
  logout();
  return null;
}

export default AppStack;