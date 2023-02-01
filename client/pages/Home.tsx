import React from "react";
import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'

import { auth } from "../configs/firebase";

const Home = ({navigation}) => {
    
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
    }
    return (
        <View 
            style={[
                styles.container
            ]}>
            <Text style={styles.text}>Welcome to Bike Kollective!</Text>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Map')
                }
            >
                <Text style={styles.buttonText}>Go To Map</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('List Bikes')
                }
            >
                <Text style={styles.buttonText}>Go To Bike List</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Return Bike')
                }
            >
                <Text style={styles.buttonText}>Return Bike</Text>
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