import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { RatingInput } from 'react-native-stock-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { patchRide } from "../services/rides";

const RateTrip = ({navigation, route}) => {
    const [rating, setRating] = useState(0);
    const [rideId, setRideId] = useState(route.params.rideId);
    const [damages, setDamages] = useState('');
    
    // submit rating and damage reports
    const handleSubmit = async () => {
        alert("TO DO: submit rating and damage report");
        const params = {rating: rating};
        console.log(params);
        await patchRide(rideId, params)
            .then(response => {
                console.log(response);
                if (response.status == 'Success') {
                    navigation.navigate('Search', { screen: 'Map' }); // pass ride_id to rate trip page
                }
            })
            .catch(error => alert(error.message));
        // TO DO: add create report function
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.subHeader}>Rate Your Trip</Text>
            <RatingInput 
                rating={rating} 
                setRating={setRating} 
                size={50}  
                maxStars={5} 
                color={'#00BFA6'}
                bordered={false}  
            />
            <View style={styles.inputContainer}>
                <TextInput  
                    placeholder="Enter damages"
                    onChangeText={text => setDamages(text)} 
                    editable = {true}  
                    maxLength = {250}  
                    numberOfLines = {10} 
                    style={styles.input}
                />  
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'justify',
    },
    header: {
        position: 'absolute',
        width: 310,
        height: 86,
        left: 33,
        top: 56,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 41,
        textAlign: 'justify',
        color: '#3F3D56',
    },
    subHeader: {
        width: 296,
        height: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'justify',
        color: '#3F3D56',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    button: {
        backgroundColor: '#00BFA6',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
});

export default RateTrip;
