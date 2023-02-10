import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {auth} from '../configs/firebase';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import {getUser} from '../services/users';

export default function Routes() {
    const { user, setUser, userToken, setUserToken, userProfile, setUserProfile } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    
    // handle user state changes
    const onAuthStateChanged = async (user: any) => {
        setUser(user); // sets to null when logging out
        if (user) {
            setUserToken(user.toJSON().stsTokenManager.refreshToken);
        } else {
            setUserToken(null);
        }
        console.log("Auth Stated Changed: ", user);
        if (initializing) {
            setInitializing(false);
            if (user) {
                const userDetails = await getUser(user.uid);   
                setUserProfile(userDetails);
            } else {
                setUserProfile(null);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
}