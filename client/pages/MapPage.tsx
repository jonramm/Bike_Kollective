import React, {useState, useEffect, useContext} from "react";
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import * as Location from 'expo-location';
import Map from "../components/Map";
import { AuthContext } from '../navigation/AuthProvider';
import Loading from "../components/Loading";

const MapPage = ({navigation}) => {

    const [errorMsg, setErrorMsg] = useState(null);
    const {userLocation, setUserLocation} = useContext(AuthContext);

    useEffect(() => {
        (async () => {   
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } 
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        })();
      }, []);

    if (userLocation) {

        return (
            <View style={styles.container}>
                <Map 
                    latitude={userLocation.latitude} 
                    longitude={userLocation.longitude}
                />
            </View>  
        )
    } else {
        return (
            <View>
                <Loading />
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