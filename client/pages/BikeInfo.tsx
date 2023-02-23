import React, {useEffect, useState, useContext} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseImg from '../components/FirebaseImg';
// @ts-ignore
import {Rating} from 'react-native-stock-star-rating';
import {addRide} from '../services/rides';
import {patchBike} from '../services/bikes';
import {AuthContext} from '../navigation/AuthProvider';
import {distToBike} from '../services/distanceCalc';
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';
import { MAX_BIKE_DISTANCE } from "../constants/distance";


const BikeInfo = ({route, navigation}) => {

    // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
    // We're not currently using state persistence so I'm suppressing this error,  
    // but it would be cool if we eventually persisted the countdown timer.
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const startTimer = route.params.startTimer;

    const {userProfile} = useContext(AuthContext);
    const {userLocation} = useContext(AuthContext);
    const {bike} = route.params;
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const goBack = navigation.addListener('gestureEnd', (e) => {
            navigation.goBack();
        });
        return goBack;
    }, [navigation]);

    useEffect(() => {
        var dist = distToBike(userLocation, bike.location);
        setDistance(dist);
    }, []);

    const handleStartTrip = () => {

        if (distance > MAX_BIKE_DISTANCE) {
            alert('User not close enough to bike');
            return
        }

        const patchBikeParams = {
            status: 'checked out', 
            owner: userProfile.user_id,
            tags: bike.tags                 // TODO - update so that tags are not required in request.body
        };
        const addRideParams = {
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
        Promise.all([patchBike(bike.bike_id, patchBikeParams), addRide(addRideParams)]).then(responses => {
            if (responses[0].status === 201 && responses[1].status === 201){
                startTimer(); // If everything is groovy we start the ride timer here
                navigation.navigate('Booking', {screen: 'Return Bike'}, {bike: bike});
            }
        })
        .catch(error => alert(error.message));
    }

    const onStartTripButton = async () => {
        handleStartTrip();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
            <FirebaseImg photo={bike.photo} imgStyle={styles.imgSizeLandscapeFullBleed}></FirebaseImg>
            <ScrollView>
                <View style={styles.containerColsMedium}>
                    <View style={[styles.containerColsXSmall, styles.headerContainerMedium]}>
                        <Text style={styles.headerXLarge}>{bike.name}</Text>
                        <Text style={styles.textMedium}>{bike.status}</Text>
                    </View>

                    <View style={styles.containerRowsMedium}>
                        <View style={styles.containerRowsMedium}>
                            <Icon name='map-marker' size={iconSizes.md} style={[styles.itemRowSpaceRight, styles.iconGreen]} />
                            <Text style={styles.textHightlightMedium}>
                                {distToBike(userLocation, bike.location)} meters
                            </Text>
                        </View>
                        <View>
                            <Rating stars={bike.agg_rating} maxStars={5} size={iconSizes.md} color={colors.green} />
                        </View>
                    </View>
                    <Text style={styles.textMedium}>{bike.description}</Text>

                </View>
            </ScrollView>
            <View style={styles.buttonBottomContainer}>
                {!userProfile.waiver ? <Text>You must sign the accident waiver before continuing!</Text> : <Text></Text>}
                <TouchableOpacity onPress={() => onStartTripButton()} style={!userProfile.waiver ? styles.buttonDisabled : styles.buttonBottom} disabled={!userProfile.waiver}>
                    <Text style={styles.buttonBottomText}>Start Trip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default BikeInfo;