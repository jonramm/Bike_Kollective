import { Marker } from 'react-native-maps';
import { LocationProps } from '../types';

const MyMarker = (props: LocationProps) => {
    return (
        <Marker 
        key="1"
        coordinate={{
            'latitude': props.latitude, 
            'longitude': props.longitude
        }}
        title='Me!'
        description="My location"
        />
    )
}

export default MyMarker;