import { Marker } from 'react-native-maps';

type LocationProps = {
    latitude: number,
    longitude: number
}

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