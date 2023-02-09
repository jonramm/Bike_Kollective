import React, { useState, useEffect, useMemo } from 'react';
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ListBikes from "./pages/ListBikes";
import ReturnBike from "./pages/ReturnBike";
import AddBike from "./pages/AddBike";
import BikeInfo from "./pages/BikeInfo";
import RateTrip from "./pages/RateTrip";
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from './configs/firebase';
import { SignInCredentials } from './types/types';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthStack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Log In" }}
    />
  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
    />
    <HomeStack.Screen
      name="Map"
      component={MapPage}
    />
    <HomeStack.Screen
      name="List Bikes"
      component={ListBikes}
    />
    <HomeStack.Screen
      name="AddBike"
      component={AddBike}
    />
    <HomeStack.Screen
      name="Return Bike"
      component={ReturnBike}
    />
    <HomeStack.Screen
      name="Bike Info"
      component={BikeInfo}
    />
    <HomeStack.Screen
      name="Rate Trip"
      component={RateTrip}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Map" component={MapPage} />
    <SearchStack.Screen name="List Bikes" component={ListBikes} />
  </SearchStack.Navigator>
);

const TabStackScreen = () => (
  <TabsStack.Navigator
  // TODO - update screenOptions focus effect for icons, larger navbar 
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        if (route.name === 'Home') {
          return <Icon name='home' size={20} color={'#00BFA6'}/>;
        } else {
          return <Icon name='search' size={20} color={'#00BFA6'}/>;
        }
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <TabsStack.Screen name="Home" component={HomeStackScreen} />
    <TabsStack.Screen name="Search" component={SearchStackScreen} />
  </TabsStack.Navigator>
);

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    {userToken ? (              // TODO - update to use a real credential
      <RootStack.Screen
        name="App"
        component={TabStackScreen}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
      />
    )}
  </RootStack.Navigator>
);

const Splash = () => (            // TODO - move to its own page
  <View>
    <Text>Loading...</Text>
  </View>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: ({ email, password }: SignInCredentials) => {
        setIsLoading(false);      // TODO - integrate this with the funciton
        setUserToken("asdf");     // TODO - update to use a real credential / integrate this with the function

        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            AsyncStorage.setItem('uid', JSON.stringify(user.uid));
        })
        .catch(error => alert(error.message));
      },
      signUp: ({ email, password }: SignInCredentials) => {
        setIsLoading(false);      // TODO - integrate this with the function 
        setUserToken("asdf");     // TODO - integrate this with the function / integrate this with the function

        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            AsyncStorage.setItem('uid', JSON.stringify(user.uid));
        })
        .catch(error => alert(error.message));
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);

        auth
        .signOut()            // TODO - update this
        // .then(() => {
        //   navigation.replace("Login")
        // })
        .catch(error => alert(error.message))
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* update userToken to use a real credential */}
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

