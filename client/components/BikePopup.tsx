import { StyleSheet, Alert, View, Text, Pressable, Button } from 'react-native';
import { Callout } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons'; 
import { Rating } from 'react-native-stock-star-rating';
import { Bike, BikeProp } from '../types/types';
import { distToBike } from '../services/distanceCalc';
import FirebaseImg from './FirebaseImg';

const BikePopup = (props: BikeProp) => {
    const bike = props.bike;
    const distance = distToBike(props.userLocation, bike.location)
    return (
        <Callout
            tooltip={true}
        >
            <View style={styles.popupContainer}>
                <View style={styles.display}>
                    <FirebaseImg 
                        photo={bike.photo}
                        width={160}
                        height={140}/>
                    <Text style={styles.header}>{bike.name}</Text>
                    <Text 
                        style={
                            (bike.status === 'available') 
                            ? styles.available : styles.unavailable
                            }
                    >
                        {bike.status}
                    </Text>
                    <Text style={styles.description}>{bike.description}</Text>
                    <Rating 
                        stars={bike.agg_rating} 
                        maxStars={5} size={20} 
                        color={(bike.agg_rating > 4) ? 'green'
                            : (bike.agg_rating > 3) ? 'yellow'
                            : 'red'}/>
                    <Text>
                        Bike is {distance} meters away
                    </Text>
                </View>
                <Pressable
                    onPress={_ => {
                        Alert.alert('button pressed');
                        }}
                >
                    <Text style={styles.button}>
                        Check Out Bike
                        <Entypo name="chevron-right" size={24} color="blue" />
                    </Text>
                </Pressable>
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
        width: 200,
        height: 'auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
      },
    display: {
        flexDirection: 'column',
        gap: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    available: {
        fontSize: 16,
        color: 'green',
    },
    unavailable: {
        fontSize: 16,
        color: 'red'
    },
    button: {
        color: 'blue',
        fontSize: 20,
    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontStyle: 'italic'
    }
  });

  export default BikePopup;