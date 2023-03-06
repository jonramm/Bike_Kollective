import React, { useState, useEffect, useContext } from 'react';
import {Text, View, Button, SafeAreaView, StatusBar } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import { getUser, patchUser } from '../services/users';
import { styles } from '../styles/styles';
import { colors } from '../styles/base';

const Profile = ({ route, navigation }) => {
    const { userProfile, setUserProfile } = useContext(AuthContext);
    const [signature, setSignature] = useState(null);

    const updateAccidentWaiver = async () => {
        const params = {waiver: true, bikes_owned: [], bikes_checked_out: []};
        console.log(userProfile.user_id);
        await patchUser(userProfile.user_id, params)
            .then(response => {
                console.log(response);
            })
            .catch(error => alert(error.message));
    }

    const onOk = async (sig) => {
        setSignature(sig);
        await updateAccidentWaiver();
        const userDetails = await getUser(userProfile.user_id); 
        console.log(userDetails);  
        await setUserProfile(userDetails);
        console.log('Signed!')
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
        
            <View style={styles.container}>
                <View>
                    <Text style={styles.textMedium}>Welcome, {userProfile.first_name}</Text>
                </View>
                <View>
                    {!signature && !userProfile.waiver ?
                        <Button
                            title='Sign waiver'
                            onPress={() => {
                                navigation.navigate(
                                    'Accident Waiver',
                                    {onOk: onOk, waiverType: 'user'}
                                )
                            }}
                        />
                        :
                        <View style={styles.signedContainer}>
                            <Text style={styles.textMedium}>Waiver Signed!</Text>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile;