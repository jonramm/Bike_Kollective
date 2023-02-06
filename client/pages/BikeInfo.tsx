import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseImg from '../components/FirebaseImg';
import { Rating } from 'react-native-stock-star-rating';
import { FirebaseImgProps } from '../types/types';


const BikeInfo = ({route, navigation}) => {

    const { bike } = route.params;
    const imgProps : FirebaseImgProps = {
        width: '100%',
        height: undefined,
        aspectRatio: 4/3,
      }

    return (
        <View style={styles.bikeInfoContainer}>
            <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Return Bike', {bike: bike})} style={styles.button}>
                        <Text style={styles.buttonText}>Start Trip</Text>
                    </TouchableOpacity>
                </View>
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
    componentContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'justify',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40,
      },
    button: {
        backgroundColor: '#00BFA6',
        width: '100%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})

export default BikeInfo;