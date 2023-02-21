import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {auth} from '../configs/firebase';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import {getUser} from '../services/users';

export default function Routes() {
    const { user, setUser, userToken, setUserToken, userProfile, setUserProfile, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [enter, setEnter] = useState(false);
    const [verified, setVerified] = useState(false);
    
    // handle user state changes
    const onAuthStateChanged = async (user: any) => {
        setEnter(false);
        setVerified(false);
        setUser(user); // sets to null when logging out
        console.log("Auth State Changed: ", user);
        
        if (initializing) {
            if (user) {
                await setUserToken(user.toJSON().stsTokenManager.refreshToken);
                const userDetails = await getUser(user.uid);   
                await setUserProfile(userDetails);
                
                if (!userDetails?.account_locked) {
                    setEnter(true);
                } else {
                    alert("Account Banned.");
                    logout();
                }

                if (user?.emailVerified) {
                    setVerified(true);
                } else {
                    alert("Please verify your email, then log in.");
                    logout();
                }
            } else {
                await setUserToken(null);
                await setUserProfile(null);
            }
            setInitializing(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        setInitializing(true);
        setLoading(true);
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
      <NavigationContainer>
        {enter && verified ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
}