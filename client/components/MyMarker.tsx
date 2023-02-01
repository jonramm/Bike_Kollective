import { Marker } from 'react-native-maps';
import { LocationProps } from '../types/types';
import MarkerImage from './MarkerImage';
import { StyleSheet } from 'react-native';

const userImage = require('../assets/user.png')

const MyMarker = (props: LocationProps) => {
    return (
        <Marker 
            key="1"
            coordinate={{
                'latitude': props.latitude, 
                'longitude': props.longitude
            }}
            >
                <MarkerImage 
                    img={userImage}
                    styles={styles}
                />
        </Marker>
    )
}

const styles = StyleSheet.create({
    img: {
      width: 30,
      height: 30,
    },
  });

export default MyMarker;