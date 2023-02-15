import React, { useState, useEffect, useContext } from "react";
import { 
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet
} from "react-native";
import MapView from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BikeMarker from "./BikeMarker";
import { getBikesWithinProximity } from "../services/bikes";
import { useNavigation } from '@react-navigation/native';
import {BIKE_RADIUS} from '../constants/distance';
import {AuthContext} from '../navigation/AuthProvider';

const Map = (props) => {

    const [bikeArray, setBikeArray] = useState([]);
    const navigation = useNavigation();
    const {userLocation} = useContext(AuthContext);

    useEffect(() => {
        getBikesWithinProximity(BIKE_RADIUS, userLocation)
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
                style={styles.map}
                region={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221,
                }}
                showsUserLocation={true}
            >
                {bikeArray.map((bike) => {
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
                    size={40}
                    color='black'
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
});

export default Map;