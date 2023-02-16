import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {auth} from '../configs/firebase';
import {AuthContextType} from '../types/types';

// expose user data to only screens part of AppStack navigator when the user successfully logs in
export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({children}) => {
    // response from auth functions, contains uid, email, refresh token
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    // response from firestore user collection
    const [userProfile, setUserProfile] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const handleLogin = async (email: string, password: string) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log("Logged in: ", user.email);
          console.log(user.uid);
          AsyncStorage.setItem('uid', user.uid); // probably not necessary if user value in context already contains uid
          return user.uid;
        })
        .catch(error => alert(error.message));
    }

    const handleRegister = async (email: string, password: string) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log("Signed up: ", user.email);
          console.log(user.uid);
          AsyncStorage.setItem('uid', JSON.stringify(user.uid));
          return user.uid;
        })
        .catch(error => alert(error.message));
    }

    const handleLogout = async () => {
      auth
        .signOut()
        .catch(error => alert(error.message))
    }
  
    // values and functions in AuthContext can be passed around to other pages
    return (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            userToken,
            setUserToken,
            userProfile,
            setUserProfile,
            userLocation,
            setUserLocation,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogout,
          }}
        >
          {children}
        </AuthContext.Provider>
    )
}