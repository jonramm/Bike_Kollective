import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BikeItem from '../components/BikeItem';
import { rides } from '../data/testRides'; // switch to db/axios, use parameters
import { bikes } from '../data/testBikes'; 

const ReturnBike = ({navigation}) => {
    const [uid, setUid] = useState('');
    const [bike, setBike] = useState([]);
    const [ride, setRide] = useState([]);

    // get uid from local storage
    const getUid = async () => {
        const uid = await AsyncStorage.getItem('uid');
        console.log(uid);
        setUid(uid);
    };

    // grab current trip for the user
    const getRide = async () => {
        var result = rides.filter(function(val) {
            return (val["rider"] == uid && val.end_time == null);
        });
        console.log(result);
        setRide(result);
    };

    // grab bike associated with current trip
    const getBike = async () => {
        var result = bikes.filter(function(val) {
            return (val["bike_id"] == ride[0].bike);
        });
        console.log(result);
        setBike(result);
    }

    useEffect(() => {
        getUid().then(uid => {
            getRide().then(ride => {
                getBike();
            });
        });
    }, []);

    // if a ride is checked out by the user
    if (ride.length > 0) {
        return (
            <View style={styles.bikesContainer}>
                <Text>Trip in Progress</Text>
                <FlatList style={styles.bikesWrapper}
                    keyExtractor={item => item.bike_id}
                    data={bike}
                    renderItem={({item}) => (<BikeItem name={item.name} photo={item.photo}></BikeItem>)}
                />
            </View>
        )
    // if no ride is checked out by the user
    } else {
        // Placeholder
        return (
            <View>
                <Text>No bike checked out</Text> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bikesContainer: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      bikesWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
      },
})

export default ReturnBike;