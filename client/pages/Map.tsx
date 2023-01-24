import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView, 
    Image, 
    TextInput,
    FlatList 
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

const Map = () => {

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

        const myMarker = () => {
            return (
                <Marker 
                    coordinate={{
                        'latitude': location.latitude, 
                        'longitude': location.longitude
                    }}
                    title='Me!'
                />
            )
        }

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
                    <Marker 
                    key="1"
                    coordinate={{
                        'latitude': location.coords.latitude, 
                        'longitude': location.coords.longitude
                    }}
                    title='Me!'
                    description="My location"
                    />
                </MapView>
                    
            </View>  
        )
    } else {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    
}

export default Map;