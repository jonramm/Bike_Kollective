import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

const Home = ({navigation}) => {
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