import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { getUser } from "../services/users";

import { auth } from "../configs/firebase";

const Home = ({navigation}) => {
    
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
    }

    useEffect(() => {
        getUser(auth.currentUser.uid)
            .then(data => setUser(data))
            .catch(err => console.log(err));
    }, []);

    if (user) {
        return (
            <View 
                style={[
                    styles.container
                ]}>
                <Text style={styles.text}>Welcome to Bike Kollective, {user.first_name}!</Text>
                <Pressable
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('Map')
                    }
                >
                    <Text style={styles.buttonText}>Map</Text>
                </Pressable>
    
                <Pressable
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('AddBike')
                    }
                >
                    <Text style={styles.buttonText}>Add Bike</Text>
                </Pressable>
    
                <Text>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        navigation.replace("Login");
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        padding: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
    },
    buttonText: {
        color: 'blue',
        fontSize: 30
    }
})

export default Home;