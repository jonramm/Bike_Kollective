import { Marker } from 'react-native-maps';
import {  BikeProp } from '../types';
import MarkerImage from './MarkerImage';
import { StyleSheet } from 'react-native';

const bikeImage = require('../assets/bike.png')

const BikeMarker = (props: BikeProp) => {
    const bike = props.bike;
    return (
        <Marker 
            coordinate={{
                'latitude': bike.location.latitude, 
                'longitude': bike.location.longitude
            }}
            title={bike.name}
            description={bike.status}
        >
            <MarkerImage
                img={bikeImage}
                styles={styles}
            />
        </Marker>
    )
}

const styles = StyleSheet.create({
    img: {
      width: 40,
      height: 40,
    },
  });

export default BikeMarker;