import React from "react";
import MapView from 'react-native-maps';
import { 
    StyleSheet, 
} from 'react-native';
import MyMarker from "./MyMarker";
import BikeMarker from "./BikeMarker";
import { bikes } from '../data/testBikes';
import { getBikes } from "../services/bikes";

type LocationProps = {
    latitude: number,
    longitude: number
}

interface Bike {
    bike_id: string,
    name: string,
    owner: string,
    photo: string,
    release: boolean,
    agg_rating: number,
    status: string,
    lock_combo: string,
    location: LocationProps,
    tags: string[]
}

const bikeArray = bikes.map((bike) => {
    const bikeObj: Bike = {
        bike_id: bike.bike_id,
        name: bike.name,
        owner: bike.owner,
        photo: bike.photo,
        release: bike.release,
        agg_rating: bike.agg_rating,
        status: bike.status,
        lock_combo: bike.lock_combo,
        location: bike.location,
        tags: bike.tags
    }
    return bikeObj;
})

const Map = (props: LocationProps) => {

    getBikes();

    return (
        <MapView 
            style={styles.map}
            region={{
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }} 
        >
            <MyMarker 
                latitude={props.latitude} 
                longitude={props.longitude}
            />
            {bikeArray.map((bike) => {
                return <BikeMarker bike={bike} />
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