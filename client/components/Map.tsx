import React, { useState, useEffect, useContext } from "react";
import { 
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    StyleSheet
} from "react-native";
import MapView from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BikeMarker from "./BikeMarker";
import { getAvailableBikesWithinProximity } from "../services/bikes";
import { useNavigation } from '@react-navigation/native';
import {BIKE_RADIUS} from '../constants/distance';
import {AuthContext} from '../navigation/AuthProvider';
import {colors, iconSizes} from '../styles/base';

const Map = (props) => {

    const [bikeArray, setBikeArray] = useState([]);
    const navigation = useNavigation();
    const {userLocation} = useContext(AuthContext);

    useEffect(() => {
        getAvailableBikesWithinProximity(BIKE_RADIUS, userLocation)
            .then(data => setBikeArray(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <SafeAreaView style={styles.mapContainer}>
            <StatusBar
                backgroundColor='white'
                barStyle='dark-content'
            />
            <MapView 
                provider={undefined}
                style={styles.map}
                region={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}    // recenter map on user location
            >
                {bikeArray.map((bike) => {
                    if (bike.status === 'available')
                        return <BikeMarker 
                                bike={bike} 
                                key={bike.bike_id} />
                })}
            </MapView>
            <TouchableOpacity
                style={styles.listButton}
                // Had to apply type 'never' to string param for navigate.
                // Seems like a weird React/TypeScript issue and this is
                // a quick workaround as found here:
                // https://stackoverflow.com/questions/68667766/react-native-typescript-string-is-not-assignable-to-parameter-of-type-never
                onPress={() => {
                    navigation.navigate(
                        'Search' as never,
                        {
                            screen: 'List Bikes',
                            params: { userLocation: userLocation }
                        } as never
                    )
                }
                }
            >
                <Ionicons
                    name='list'
                    size={iconSizes.xl}
                    color={colors.blue_dark}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%',
    },
    listButton: {
        position: 'absolute', 
        top: getStatusBarHeight() + 10,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        position: 'absolute', 
        bottom: 20
      },
});

export default Map;