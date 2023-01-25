import React from "react";
import MapView from 'react-native-maps';
import { 
    StyleSheet, 
} from 'react-native';
import MyMarker from "./MyMarker";

type LocationProps = {
    latitude: number,
    longitude: number
}

const Map = (props: LocationProps) => {

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