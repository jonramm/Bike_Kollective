import * as React from 'react';
import { useState } from 'react';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapPage from '../pages/MapPage';
import AddBike from '../pages/AddBike';
import BikeInfo from '../pages/BikeInfo';
import ListBikes from '../pages/ListBikes';
import RateTrip from '../pages/RateTrip';
import ReturnBike from '../pages/ReturnBike';
import Waiver from '../components/Waiver';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {

  // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  // We're not currently using state persistence so I'm suppressing this error,  
  // but it would be cool if we eventually persisted the countdown timer.
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state', 
  ]);

  const [timerState, setTimerState] = useState(null);

  // This creates a timer object that runs in the background.
  // I'm storing it in a state variable so we can start it when
  // we begin a ride and stop it when we return a bike.
  const startTimer = () => {
    let timer = null;
    // Change the second parameter of setTimeout to lengthen
    // the timer.
    timer = setTimeout(() => {
        console.log('The set time has elapsed');
        alert('Please return your bike!');
        clearTimeout(timerState);
      }, 10 * 1000);
    setTimerState(timer);
  }

  // Deletes the timer instance
  const endTimer = () => {
    clearTimeout(timerState);
    setTimerState(null);
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
      <Tab.Screen name="Add" component={AddNav} />
      <Tab.Screen 
        name="Booking" 
        component={BookingNav} 
        initialParams={{
          endTimer: endTimer
        }}
      />
    </Tab.Navigator>
  )
}

const SearchNav = ({route}) => {
  const startTimer = route.params.startTimer;

  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="List Bikes" component={ListBikes}/>
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
        name="Waiver"
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
        <Stack.Screen name="Rate Trip" component={RateTrip}/>
      </Stack.Navigator>
  )
}

export default AppStack;