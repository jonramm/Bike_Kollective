import React, { useState, useEffect, useContext } from 'react';
import {Text, View, Button, } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import { patchUser } from '../services/users';
import { styles } from '../styles/styles';

const Profile = ({ route, navigation }) => {
    const { userProfile } = useContext(AuthContext);
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

    const onOk = (sig) => {
        setSignature(sig);
        updateAccidentWaiver();
        console.log('Signed!')
        navigation.goBack();
    }

    // Placeholder
    if (userProfile.waiver) {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        )
    }

    return (
        <View>
            {!signature
                    ?
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
    )
}

export default Profile;