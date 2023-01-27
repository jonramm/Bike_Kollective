import { Marker } from 'react-native-maps';
import {  BikeProp } from '../types';
import MarkerImage from './MarkerImage';

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
            />
        </Marker>
    )
}

export default BikeMarker;