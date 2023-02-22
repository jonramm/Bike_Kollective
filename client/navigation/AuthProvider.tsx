import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as Location from 'expo-location';

import {auth, client_id, expo_client_id, provider} from '../configs/firebase';
import {AuthContextType} from '../types/types';
import { addUser } from '../services/users';

// expose user data to only screens part of AppStack navigator when the user successfully logs in
export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({children}) => {
    // response from auth functions, contains uid, email, refresh token
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    // response from firestore user collection
    const [userProfile, setUserProfile] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    // const [request, response, promptAsync] = tokenFunction();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
          clientId: client_id,
          expoClientId: expo_client_id,
      },
    );

    useEffect(() => {
      (async () => {   
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              return;
          } 
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
      })();
    }, []);

    const createUser = async (email: string, firstName: string, lastName: string, uid: string) => {
      const params = {email: email, first_name: firstName, last_name: lastName, user_id: uid};
      await addUser(params)
        .then(response => {
          console.log(response);
        })
        .catch(error => alert(error.message));
    }

    const googleAuthentication = async () => {
      const response = await promptAsync();

      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = provider.credential(id_token);
        await auth
          .signInWithCredential(credential)
          .then(userCredentials => {
            const user = userCredentials.user;
            const profile = userCredentials.additionalUserInfo.profile;
            console.log("Logged in: ", user.email);
            console.log(user.uid);
            const uid = user.uid;
            const email = user.email;
            // @ts-ignore
            const firstName = profile.given_name; // does exist
            // @ts-ignore
            const lastName = profile.family_name; 
            const isNewUser = userCredentials.additionalUserInfo.isNewUser;
            AsyncStorage.setItem('uid', user.uid); // probably not necessary if user value in context already contains uid
            const userDict = {email: email, firstName: firstName, lastName: lastName, uid: uid, isNewUser: isNewUser}
            return userDict;
          })
          .then(async (userDict) => {
            if (userDict.isNewUser) {
              await createUser(userDict.email, userDict.firstName, userDict.lastName, userDict.uid);
            }
          })
          .catch(error => alert(error.message));
      }
    }

    const handleLogin = async (email: string, password: string) => {
      await auth
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

    const handleRegister = async (email: string, password: string, firstName: string, lastName: string) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredentials) => {
          const currentUser = auth.currentUser
          await verifyEmailAddress(currentUser);
          const user = userCredentials.user;
          console.log("Signed up: ", user.email);
          console.log(user.uid);
          AsyncStorage.setItem('uid', JSON.stringify(user.uid));
          return user.uid;
        })
        .then(async (uid) => {
          await createUser(email, firstName, lastName, uid);
        })
        .catch(error => alert(error.message));
    }

    const verifyEmailAddress = async (currentUser: any) => {
      console.log(currentUser);
      await currentUser.sendEmailVerification()
        .then(() => {
          alert("Verification email sent.");
        })
        .catch(error => alert(error.message));
    }

    const handleLogout = async () => {
      await auth
        .signOut()
        .catch(error => alert(error.message))
    }

    const resetPassword = async (email: string) => {
      await auth
        .sendPasswordResetEmail(email)
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
            googleAuth: googleAuthentication,
            resetPass: resetPassword,
            verifyEmail: verifyEmailAddress,
          }}
        >
          {children}
        </AuthContext.Provider>
    )
}