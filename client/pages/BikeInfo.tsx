import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseImg from '../components/FirebaseImg';
import { Button } from 'react-native-paper';
import { Rating } from 'react-native-stock-star-rating';


const BikeInfo = ({route, navigation}) => {

    const { bike } = route.params;

    return (
        <View style={styles.bikeInfoContainer}>
            <FirebaseImg style={styles.bikePhoto} photo={bike.photo}></FirebaseImg>
            <View style={styles.bikeDataContainer}>
                <Text style={styles.bikeNameText}>{bike.name}</Text>
                <View style={styles.bikeHighlightRow}>
                    <View style={styles.bikeItemLeft}>
                        <Icon name='map-marker' size={20} style={styles.bikeLocationIcon} />
                        <Text style={styles.bikeLocationText}>546 meters</Text>
                    </View>
                    <View>
                        <Rating stars={bike.agg_rating} maxStars={5} size={20} color={'#00BFA6'}/>
                    </View>
                </View>
                <Text style={styles.bikeDescriptionText}>{bike.description}</Text>
                <Button                                     // TODO Make button larger
                    mode="contained" 
                    buttonColor='#E7FAF4' 
                    textColor='#00BFA6' 
                    onPress={() => navigation.navigate('Return Bike', {bike: bike})}>
                    Start Trip
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bikeInfoContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    bikeDataContainer: {
        flexDirection: 'column',
        padding: 20,
        
    },
    bikeItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    bikeHighlightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bikePhoto: {
        aspectRatio: 3/2,
    },
    bikeLocationIcon: {
        color: '#00BFA6',
        marginRight: 10, 
    },
    bikeNameText: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30,
    },
    bikeLocationText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#00BFA6',
    },
    bikeDescriptionText: {
        fontSize: 18,
        textAlign:'justify',
        marginBottom: 50,
    },
})

export default BikeInfo;