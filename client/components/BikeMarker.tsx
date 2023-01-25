import { Marker } from 'react-native-maps';

type LocationProps = {
    latitude: number,
    longitude: number
}

type BikeProp = {
    bike: Bike
}

type Bike = {
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

const BikeMarker = (props: BikeProp) => {
    return (
        <Marker 
        key="1"
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