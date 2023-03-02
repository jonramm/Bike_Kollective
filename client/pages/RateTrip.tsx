import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
// @ts-ignore
import { RatingInput } from 'react-native-stock-star-rating';

import IssueModal from "../components/IssueModal";
import { patchRide } from "../services/rides";
import { patchBike } from "../services/bikes";

const RateTrip = ({navigation, route}) => {
    const [rating, setRating] = useState(0);
    const [rideId, setRideId] = useState(route.params.rideId);
    const [bikeId, setBikeId] = useState(route.params.bike.bike_id);
    const [aggRating, setAggRating] = useState(route.params.bike.agg_rating);
    const [numRating, setNumRating] = useState(route.params.bike.num_ratings);

    const calculateRating = async () => {
        const currNumRating = numRating > 0 ? numRating : 0;
        const currAggRating = aggRating > 0 ? aggRating : 0;
        let newNumRating = currNumRating + 1;
        let newAggRating = ((currAggRating * currNumRating) + rating)/newNumRating;
        return {num: newNumRating, agg: newAggRating};        
    }
    
    // submit rating
    const handleSubmit = async () => {
        const ride_params = {rating: rating};
        let bike_params = {tags: []}; // backend route requires tags

        // only update rating in db if user submits rating
        if (rating > 0) {
            const ratings = await calculateRating();
            bike_params["num_ratings"] = ratings.num;
            bike_params["agg_rating"] = ratings.agg;
        }

        Promise.all([patchRide(rideId, ride_params), patchBike(bikeId, bike_params)])
            .then(responses => {
                if (responses[0].status === 201 && responses[1].status === 201) {
                    navigation.navigate('Search', { screen: 'Map' });
                }
            })
            .catch(error => alert(error.message));
    };
  
    return (
        <View style={styles.container}>
            <IssueModal route={route} navigation={navigation}></IssueModal>
            <Text style={styles.subHeader}>Rate Your Trip</Text>
            <RatingInput 
                rating={rating} 
                setRating={setRating} 
                size={50}  
                maxStars={5} 
                color={'#00BFA6'}
                bordered={false}  
            />

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
        marginTop: 25,
        textAlign: 'center',
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
