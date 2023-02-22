import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, LogBox} from 'react-native';
import { Timestamp } from "firebase/firestore";
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

import BikeItem from '../components/BikeItem';
import { getBikes, checkInBike } from "../services/bikes";
import { getRides, patchRide } from "../services/rides";
import { patchUser } from "../services/users";
import { AuthContext } from "../navigation/AuthProvider";
import CountdownTimer from '../components/CountdownTimer';

const ReturnBike = ({route, navigation}) => {

    // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
    // We're not currently using state persistence so I'm suppressing this error,  
    // but it would be cool if we eventually persisted the countdown timer.
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const endTimer = route.params.endTimer;

    const {user} = useContext(AuthContext);
    const [uid, setUid] = useState('');
    const [bike, setBike] = useState([]);
    const [ride, setRide] = useState([]);
    const [lockCombo, setlockCombo] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [targetDate, setTargetDate] = useState(dayjs());
    const {logout} = useContext(AuthContext);
    const {userLocation, setUserLocation} = useContext(AuthContext);

    // get uid from local storage
    const getUid = async () => {
        // const uid = await AsyncStorage.getItem('uid');
        const uid = await user.uid;
        setUid(uid);
        return uid;
    };

    // grab current trip for the user
    const getRide = async (uid: string) => {
        const rides = await getRides();
        var result = await rides.data.filter(function(val: { [x: string]: any; }) {
            return (val["rider"] == uid && val["end_time"] == null);
        });
        setRide(result);
        return result;
    };

    // grab bike associated with current trip
    const getBike = async (ride: string | any[]) => {
        if (ride.length > 0) {
            const bikes = await getBikes();
            var result = bikes.filter(function(val: { [x: string]: string; }) {
                return (val["bike_id"] == ride[0].bike);
            });
            setBike(result);
            return result;
        } else {
            const result = [];
            setBike(result);
            return result;
        }
    };

    // extract lock combo from bike
    const getLockCombo = async (bike: string | any[]) => {
        if (bike.length > 0) {
            const lockCombo = await bike[0].lock_combo;
            setlockCombo(lockCombo);
            return lockCombo;
        } else {
            const lockCombo = '';
            setlockCombo(lockCombo);
            return lockCombo;
        }
    };

    const calculateTripTime = async () => {
        let ts = await ride[0].start_time;
        // convert firestore timestamp to JS datetime object
        let ts_formatted = (new Timestamp(ts._seconds, ts._nanoseconds)).toDate();
        let start_date_time = dayjs(ts_formatted);
        console.log("Start: ", start_date_time);
        setStartDate(start_date_time);

        let end_date_time = start_date_time.add(24, 'hour');
        console.log("End: ", end_date_time);
        setTargetDate(end_date_time);
    }

    // set end time for trip
    const handleEndTrip = async () => {
        const params = {end_time: 'This can be any value'};
        console.log(params);
        endTimer();
        await checkInBike(
            ride[0].bike, 
            {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            });
        await patchRide(ride[0].ride_id, params)
            .then(response => {
                console.log(response);
                if (response.status == 201) {
                    console.log(ride);
                    navigation.navigate('Rate Trip', { rideId: ride[0].ride_id, bikeId: bike[0].bike_id, userId: uid }); // pass ride_id to rate trip page
                }
            })
            .catch(error => alert(error.message));
        // TO DO: change bike status to available
    };

    // determines if user should have their account locked if trip >= 24 hours
    const banUser = async () => {
        let currentDate = dayjs();
        if (currentDate >= targetDate) {
            const params = {account_locked: true, bikes_owned: [], bikes_checked_out: []}
            await patchUser(uid, params)
                .then(response => {
                    console.log(response);
                    if (response.status == 201) {
                        alert("Your account has been banned.");
                        logout(); // triggers logout on account getting banned
                    }
                })
                .catch(error => alert(error.message));
        }
    }

    useEffect(() => {
        getUid().then(uid => {
            getRide(uid).then(ride => {
                getBike(ride).then(bike => {
                    getLockCombo(bike);
                });
            });
        });
    }, []);

    useEffect(() => {
        if (ride.length > 0) {
            calculateTripTime();
            banUser();
        }
    }, [ride]);
    
    // if a ride is checked out by the user
    if (ride.length > 0) {
        return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.header}>Trip in Progress</Text>
                    </View>
                    <FlatList style={styles.bikesWrapper}
                        keyExtractor={item => item.bike_id}
                        data={bike}
                        renderItem={({item}) => (<BikeItem bike={item} hasLink={false}></BikeItem>)}
                    />

                    <View style={styles.componentContainer}>
                        <View style={styles.textContainer}>
                            <Icon name='lock' size={30} color={'#3F3D53'}/>
                            <Text style={styles.subHeader}>Lock Combination</Text>
                        </View>
                        <View style={styles.comboContainer}>
                            <Text style={styles.comboText}>{lockCombo}</Text>
                        </View>
                    </View>

                    <View style={styles.componentContainer}>
                        <View style={styles.textContainer}>
                            <Icon name="clock-o" size={30} color={'#3F3D53'}/>
                            <Text style={styles.subHeader}>Time Remaining</Text>
                        </View>
                        <CountdownTimer startDate={startDate} targetDate={targetDate} />
                    </View>

                    <View style={styles.componentContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleEndTrip} style={styles.button}>
                                <Text style={styles.buttonText}>End Trip</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
        )
    // if no ride is checked out by the user
    } else {
        // Placeholder
        return (
            <View style={styles.container}>
                <Text style={styles.subHeader}>No bike checked out</Text> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 25,
        backgroundColor: '#FFF',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
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
        lineHeight: 30,
        textAlign: 'justify',
        color: '#3F3D56',
        flex: 0.8,
        flexDirection: 'row',
        marginLeft: 15,
    },
    componentContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'justify',
    },
    bikesWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#E7FAF4',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#00BFA6',
        fontWeight: '700',
        fontSize: 16,
    },
    comboContainer: {
        backgroundColor: '#F2F2F2',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    comboText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default ReturnBike;
