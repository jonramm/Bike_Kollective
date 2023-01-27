import { Marker } from 'react-native-maps';
import { LocationProps } from '../types';
import MarkerImage from './MarkerImage';

const userImage = require('../assets/user.png')

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
        >
            <MarkerImage 
                img={userImage}
            />
        </Marker>
    )
}

export default MyMarker;