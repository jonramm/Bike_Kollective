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
import {FirebaseImgProps} from '../types/types';
import {addRide} from '../services/rides';
import {patchBike} from '../services/bikes';
import {AuthContext} from '../navigation/AuthProvider';
import {distToBike} from '../services/distanceCalc';
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';


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

    useEffect(() => {
        var dist = distToBike(userLocation, bike.location);
        setDistance(dist);
    }, []);

    const handleStartTrip = () => {
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
                navigation.navigate('Booking', {screen: 'Return Bike'}, {bike: bike});
            }
        })
        .catch(error => alert(error.message));
    }

    const onStartTripButton = async () => {
        startTimer();
        handleStartTrip();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
            <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
            <ScrollView>
                <View style={styles.containerColsMedium}>
                    <View style={[styles.containerColsXSmall, styles.headerContainerMedium]}>
                        <Text style={styles.headerLarge}>{bike.name}</Text>
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
                    <View style={styles.buttonBottomContainer}>
                        <TouchableOpacity onPress={() => onStartTripButton()} style={styles.buttonBottom}>
                            <Text style={styles.buttonBottomText}>Start Trip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BikeInfo;