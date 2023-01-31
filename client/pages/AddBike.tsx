import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firebase, auth } from '../configs/firebase';
import axios from "axios";

const AddBike = ({route, navigation}) => {

    const { first_name, user_id } = route.params

    return (
        <View style={styles.container}>
            <View>
                <Text>Hey {first_name}!</Text>
                <Text>Fill out this form to add your bike to the database:</Text>
            </View>
            <View>

            </View>
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