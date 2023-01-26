import { Marker } from 'react-native-maps';
import {  BikeProp } from '../types';

const BikeMarker = (props: BikeProp) => {
    return (
        <Marker 
            coordinate={{
                'latitude': props.bike.location.latitude, 
                'longitude': props.bike.location.longitude
            }}
            title={props.bike.name}
            description={props.bike.status}
        />
    )
}

export default BikeMarker;