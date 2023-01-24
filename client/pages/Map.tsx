import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MyMarker from "../components/MyMarker";
import * as Location from 'expo-location';

const Map = ({navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {   
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } 
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
      }, []);

    if (location) {

        return (
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }} 
                >
                    <MyMarker 
                        latitude={location.coords.latitude} 
                        longitude={location.coords.longitude}
                    />
                </MapView>
                    
            </View>  
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    map: {
      width: '100%',
      height: '100%',
    },
    loading: {
        fontSize: 20
    }
  });

export default Map;