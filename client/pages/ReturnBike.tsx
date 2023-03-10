import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Timestamp } from "firebase/firestore";
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';

import BikeItem from '../components/BikeItem';
import { getBikes, checkInBike, patchBike } from "../services/bikes";
import { getRides, patchRide } from "../services/rides";
import { patchUser } from "../services/users";
import { AuthContext } from "../navigation/AuthProvider";
import CountdownTimer from '../components/CountdownTimer';
import Loading from "../components/Loading";
import { ScrollView } from "react-native-gesture-handler";
import { colors, padding } from '../styles/base';

const ReturnBike = ({route, navigation}) => {
    const {user} = useContext(AuthContext);
    const [uid, setUid] = useState('');
    const [bike, setBike] = useState([]);
    const [ride, setRide] = useState([]);
    const [lockCombo, setlockCombo] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [targetDate, setTargetDate] = useState(dayjs());
    const {logout} = useContext(AuthContext);
    const {userLocation, setUserLocation} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const endTimer = route.params.endTimer;

    // get uid from auth context
    const getUid = async () => {
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
        setStartDate(start_date_time);
        let end_date_time = start_date_time.add(24, 'hour');
        setTargetDate(end_date_time);
    }

    // set end time for trip
    const handleEndTrip = async () => {
        setIsLoading(true);
        const ride_params = {end_time: 'This can be any value'};
        const bike_params = {
            location: {latitude: userLocation.latitude, longitude: userLocation.longitude},
            status: 'available'
        };

        endTimer();

        Promise.all([patchRide(ride[0].ride_id, ride_params), checkInBike(ride[0].bike, bike_params)])
            .then(responses => {
                if (responses[0].status === 201 && responses[0].status === 201) {
                    navigation.navigate('Rate Trip', { rideId: ride[0].ride_id, bike: bike[0], userId: uid });
                }
            })
            .catch(error => alert(error.message));
        setIsLoading(false)
    };

    // determines if user should have their account locked if trip >= 24 hours
    const banUser = async () => {
        let currentDate = dayjs();
        console.log(currentDate, targetDate);
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

    const navigateMap = async () => {
        navigation.navigate('Search', {screen: 'Map'});
    }

    useEffect(() => {
        setIsLoading(true);
        getUid().then(uid => {
            getRide(uid).then(ride => {
                getBike(ride).then(bike => {
                    getLockCombo(bike);
                    setIsLoading(false);
                });
            });
        });
    }, []);

    useEffect(() => {
        if (ride.length > 0) {
            console.log(targetDate);
            calculateTripTime();
        }
    }, [ride]);

    useEffect(() => {
        if (ride.length > 0) {
            banUser();
        }
    }, [targetDate]);

    if (isLoading) {
        return <Loading />
    }
    
    // if a ride is checked out by the user
    if (ride.length > 0) {
        return (
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={colors.white}
                        barStyle='dark-content'
                    />
                    <View style={styles.componentContainer}>
                        <Text style={styles.header}>Trip in Progress</Text>
                    </View>

                    <FlatList style={styles.bikesWrapper}
                        keyExtractor={item => item.bike_id}
                        data={bike}
                        renderItem={({item}) => (<BikeItem bike={item} hasLink={false} hasBikeLocInfo={false}></BikeItem>)}
                    />

                    <ScrollView persistentScrollbar={true} style={styles.scollContainer}>
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
                            <View>
                                <CountdownTimer startDate={startDate} targetDate={targetDate} />
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.componentContainer}>
                        <View style={styles.buttonBottomContainer}>
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
            <View style={styles.componentContainer}>
                <Text style={styles.subHeader}>No bike checked out</Text> 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={navigateMap} style={styles.button}>
                        <Text style={styles.buttonText}>Book a ride</Text>
                    </TouchableOpacity>
                </View>
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
        paddingBottom: 15,
    },
    header: {
        position: 'absolute',
        width: 310,
        height: 86,
        left: 33,
        top: padding.xl,
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
        paddingVertical: 10,
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
    scollContainer: {
        maxHeight: '35%'
    },
    buttonBottomContainer: {
        width: '60%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        padding: padding.md,
    },

});

export default ReturnBike;
