import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { firebase, auth } from '../configs/firebase';
import axios from "axios";

const AddBike = () => {

    console.log(auth.currentUser.uid);

    return (
        <View style={styles.container}>
            <Text>Add Bike</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
})

export default AddBike;