import React, {useEffect, useContext} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import { Rating } from 'react-native-stock-star-rating';
import { FirebaseImgProps } from '../types/types';
import { AuthContext } from '../navigation/AuthProvider';

import FirebaseImg from '../components/FirebaseImg';
import { distToBike } from '../services/distanceCalc';
import { addRide } from '../services/rides';


const BikeInfo = ({ route, navigation }) => {

    const { userProfile } = useContext(AuthContext);
    const { bike, userLocation } = route.params;
    const imgProps: FirebaseImgProps = {
        width: '100%',
        height: '50%',
    }

    useEffect(() => {
        const goBack = navigation.addListener('gestureEnd', (e) => {
            navigation.goBack();
        });
        return goBack;
    }, [navigation]);

    const handleAddRide = async () => {
        const body = {
            start_time: null,
            end_time: null,
            rating: null,
            bike: bike.bike_id,
            rider: userProfile.user_id,
            location_start: {
                latitude: bike.latitude,
                longitude: bike.longitude
            },
            location_end: null,
        };
        addRide(body)
        // TODO add error handling similar to AddBike page handleAddBike method
        .then((response) => {
            if (response.status === 201) {
                console.log('success')
            } else {
                console.log('failed to add ride')
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const onStartTripButton = async () => {
        handleAddRide();
        navigation.navigate('Booking', { screen: 'Return Bike' }, { bike: bike });
    }

    return (
        <SafeAreaView style={styles.bikeInfoContainer}>
            <StatusBar
                backgroundColor='white'
                barStyle='dark-content'
            />
            <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
            <View style={styles.bikeDataContainer}>
                <Text style={styles.bikeNameText}>{bike.name}</Text>
                <View style={styles.bikeHighlightRow}>
                    <View style={styles.bikeItemLeft}>
                        <Icon name='map-marker' size={20} style={styles.bikeLocationIcon} />
                        <Text style={styles.bikeLocationText}>
                            {distToBike(userLocation, bike.location)} meters
                        </Text>
                    </View>
                    <View>
                        <Rating stars={bike.agg_rating} maxStars={5} size={20} color={'#00BFA6'} />
                    </View>
                </View>
                <Text style={styles.bikeDescriptionText}>{bike.description}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onStartTripButton()} style={styles.button}>
                        <Text style={styles.buttonText}>Start Trip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bikeInfoContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    bikeDataContainer: {
        flexDirection: 'column',
        padding: 20,

    },
    bikeItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    bikeHighlightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bikeLocationIcon: {
        color: '#00BFA6',
        marginRight: 10,
    },
    bikeNameText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30,
    },
    bikeLocationText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#00BFA6',
    },
    bikeDescriptionText: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 50,
    },
    componentContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'justify',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#00BFA6',
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})

export default BikeInfo;