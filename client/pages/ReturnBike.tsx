import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BikeItem from '../components/BikeItem';
import { getBikes } from "../services/bikes";
import { getRides } from "../services/rides";

const ReturnBike = ({navigation}) => {
    const [uid, setUid] = useState('');
    const [bike, setBike] = useState([]);
    const [ride, setRide] = useState([]);
    const [lockCombo, setlockCombo] = useState('');

    // get uid from local storage
    const getUid = async () => {
        const uid = await AsyncStorage.getItem('uid');
        setUid(uid);
        return uid;
    };

    // grab current trip for the user
    const getRide = async (uid: string) => {
        const rides = await getRides();
        var result = await rides.filter(function(val) {
            return (val["rider"] == uid && val.end_time == null);
        });
        setRide(result);
        return result;
    };

    // grab bike associated with current trip
    const getBike = async (ride: string | any[]) => {
        if (ride.length > 0) {
            const bikes = await getBikes();
            var result = bikes.filter(function(val) {
                return (val["bike_id"] == ride[0].bike);
            });
            setBike(result);
            return result;
        }
    }

    const getLockCombo = async (bike: string | any[]) => {
        if (bike.length > 0) {
            const lockCombo = await bike[0].lock_combo;
            setlockCombo(lockCombo);
            return lockCombo;
        }
    };

    useEffect(() => {
        getUid().then(uid => {
            getRide(uid).then(ride => {
                getBike(ride).then(bike => {
                    getLockCombo(bike);
                });
            });
        });
    }, []);

    // if a ride is checked out by the user
    if (ride.length > 0) {
        return (
                <View style={styles.container}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.header}>Trip in Progress</Text>
                    </View>
                    <FlatList style={styles.bikesWrapper}
                        keyExtractor={item => item.bike_id}
                        data={bike}
                        renderItem={({item}) => (<BikeItem bike={item} hasLink={true}></BikeItem>)}
                    />

                    <View style={styles.componentContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.subHeader}>Lock Combination</Text>
                        </View>
                        <View style={styles.comboContainer}>
                            <Text style={styles.comboText}>{lockCombo}</Text>
                        </View>
                    </View>

                    <View style={styles.componentContainer}>
                        <Text style={styles.subHeader}>Time Remaining</Text>
                    </View>

                    <View style={styles.componentContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => alert('Todo: add end trip function')} style={styles.button}>
                                <Text style={styles.buttonText}>End Trip</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
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
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
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
    componentContainer: {
        flex: 4,
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
    comboContainer: {
        flex: 0.5,
        backgroundColor: '#F2F2F2',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    comboText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
})

export default ReturnBike;
