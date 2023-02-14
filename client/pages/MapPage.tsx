import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import * as Location from 'expo-location';
import Map from "../components/Map";

const MapPage = ({navigation}) => {

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
                <Map 
                    latitude={location.coords.latitude} 
                    longitude={location.coords.longitude}
                />
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
    loading: {
        fontSize: 20
    }
  });

export default MapPage;