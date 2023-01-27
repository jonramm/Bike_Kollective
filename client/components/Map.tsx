import React, { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { 
    StyleSheet, 
} from 'react-native';
import MyMarker from "./MyMarker";
import BikeMarker from "./BikeMarker";
import { getBikes } from "../services/bikes";
import { LocationProps } from '../types';

const Map = (props: LocationProps) => {

    const [bikeArray, setBikeArray] = useState([]);

    useEffect(() => {
        getBikes()
            .then(data => setBikeArray(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <MapView 
            style={styles.map}
            region={{
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0221,
                }} 
        >
            <MyMarker 
                latitude={props.latitude} 
                longitude={props.longitude}
            />
            {bikeArray.map((bike) => {
                return <BikeMarker 
                            bike={bike} 
                            key={bike.bike_id} />
            })}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
    }
  });

export default Map;