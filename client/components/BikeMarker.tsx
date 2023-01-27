import { Marker, Callout, CalloutSubview } from 'react-native-maps';
import {  BikeProp } from '../types';
import MarkerImage from './MarkerImage';
import { StyleSheet, Alert, View, Text, Pressable, Button } from 'react-native';

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
        >
            <MarkerImage
                img={bikeImage}
                styles={styles}
            />
            <Callout
                alphaHitTest
                style={styles.customView}
            >
                <View>
                    <Text>{bike.name}</Text>
                    <Text>{bike.status}</Text>
                    <Button 
                        title='Check Out Bike!'
                        onPress={_ => {
                            Alert.alert('button pressed');
                            }}
                    />
                </View>
            </Callout>
        </Marker>
    )
}

const styles = StyleSheet.create({
    img: {
      width: 40,
      height: 40,
    },
    customView: {
        width: 140,
        height: 140,
        textAlign: 'center',
        justifyContent: 'center'
      },
  });

export default BikeMarker;