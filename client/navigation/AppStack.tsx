import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../pages/Home';
import MapPage from '../pages/MapPage';
import AddBike from '../pages/AddBike';
import BikeInfo from '../pages/BikeInfo';
import ListBikes from '../pages/ListBikes';
import RateTrip from '../pages/RateTrip';
import ReturnBike from '../pages/ReturnBike';
import Login from '../pages/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
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
      })}
    >
      <Tab.Screen name="Search" component={SearchNav} />
      <Tab.Screen name="Add" component={AddNav} />
      <Tab.Screen name="Booking" component={BookingNav} />
    </Tab.Navigator>
  )
}

// TO DO: remove, don't need a home page, map page will load upon signing in
const HomeNav = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="List Bikes" component={ListBikes}/>
        <Stack.Screen name="AddBike" component={AddBike} />
        <Stack.Screen name="Return Bike" component={ReturnBike}/>
        <Stack.Screen name="Bike Info" component={BikeInfo}/>
        <Stack.Screen name="Rate Trip" component={RateTrip}/>
      </Stack.Navigator>
  )
}

const SearchNav = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="List Bikes" component={ListBikes}/>
        <Stack.Screen name="Bike Info" component={BikeInfo}/>
      </Stack.Navigator>
  )
}

const AddNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Add Bike" component={AddBike}/>
    </Stack.Navigator>
  )
}

const BookingNav = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Return Bike" component={ReturnBike}/>
        <Stack.Screen name="Rate Trip" component={RateTrip}/>
      </Stack.Navigator>
  )
}

export default AppStack;