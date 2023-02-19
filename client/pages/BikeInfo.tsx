import React, {useEffect, useState, useContext} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseImg from '../components/FirebaseImg';
// @ts-ignore
import {Rating} from 'react-native-stock-star-rating';
import {FirebaseImgProps} from '../types/types';
import {addRide} from '../services/rides';
import { makeBikeUnavailable } from "../services/bikes";
import {AuthContext} from '../navigation/AuthProvider';
import {distToBike} from '../services/distanceCalc';
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';


const BikeInfo = ({route, navigation}) => {

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
        await makeBikeUnavailable(bike.bike_id);
        addRide(body)
        .then((response) => {
            if (response.status === 201) {
                navigation.navigate('Booking', {screen: 'Return Bike'}, {bike: bike});
            }
        })
        .catch(error => alert(error.message))
    }

    const onStartTripButton = async () => {
        handleAddRide();
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
            <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
            <View style={styles.containerColsMedium}>
                <Text style={styles.headerLarge}>{bike.name}</Text>
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
        </SafeAreaView>
    )
}

export default BikeInfo;