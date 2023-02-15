import React, {useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FirebaseImg from '../components/FirebaseImg';
import Icon from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import { Rating } from 'react-native-stock-star-rating';
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from '../navigation/AuthProvider';
import { distToBike } from '../services/distanceCalc';
import { FirebaseImgProps } from '../types/types';

const BikeItem = (props) => {

  const navigation = useNavigation();
  const bike = props.bike;
  const {userLocation} = useContext(AuthContext);
  const imgProps : FirebaseImgProps = {
    width: 120,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  }

  const hasBikeInfoLink = props.hasLink? (
    // Using 'as never' to avoid linting issues, still in search of a better solution
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate(
          'Bike Info' as never, 
          {
            bike: bike,
            userLocation: userLocation
          } as never)}} >
      <Icon name='chevron-right' size={20} style={styles.bikeItemIcon} />
    </TouchableOpacity>
  ) : null;

  return (
    <View style={styles.bikeItem}>
      <View style={styles.bikeItemLeft}>
        <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
        <View style={styles.bikeItemCenter}>
          <Text style={styles.bikeItemText}>{bike.name}</Text>
          <Rating stars={bike.agg_rating} maxStars={5} size={20} color={'#00BFA6'}/>
          <Text>{distToBike(userLocation, bike.location)} meters away</Text>
        </View>
      </View>
        {hasBikeInfoLink}
    </View>
  )
}

const styles = StyleSheet.create({
    bikeItem: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bikeItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  bikeItemCenter: {
    flexDirection: 'column',
  },
  bikeItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bikeItemIcon: {
    color: '#d6d7da',
    marginRight: 10,
  },
});

export default BikeItem;