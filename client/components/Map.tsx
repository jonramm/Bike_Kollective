import React, { useState, useEffect } from "react";
import { 
    Pressable, 
    Text,
    TouchableOpacity, 
    View } from "react-native";
import MapView from 'react-native-maps';
import { 
    StyleSheet, 
} from 'react-native';
import MyMarker from "./MyMarker";
import BikeMarker from "./BikeMarker";
import { getBikes, getBikesWithinProximity } from "../services/bikes";
import { LocationProps } from '../types/types';

const BIKE_RADIUS = 5000;

const Map = (props: LocationProps) => {

    const [bikeArray, setBikeArray] = useState([]);

    const userLocation = {
        latitude: props.latitude,
        longitude: props.longitude
    }

    useEffect(() => {
        getBikesWithinProximity(BIKE_RADIUS, userLocation)
            .then(data => setBikeArray(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map}
                region={{
                    latitude: props.latitude,
                    longitude: props.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0221,
                    }} 
                showsUserLocation={true}
            >
                {bikeArray.map((bike) => {
                    return <BikeMarker 
                                bike={bike} 
                                key={bike.bike_id}
                                userLocation={userLocation} />
                })}
            </MapView>
            <TouchableOpacity 
                style={styles.listButton}
                >
                <Text>List View</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    listButton: {
        position: "absolute", 
        top: 20,
        backgroundColor: 'white',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    }
  });

export default Map;