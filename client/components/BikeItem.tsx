import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FirebaseImg from '../components/FirebaseImg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-stock-star-rating';
import { useNavigation } from "@react-navigation/native";


const BikeItem = (props) => {

  const navigation = useNavigation();
  const bike = props.bike;

  return (
    <View style={styles.bikeItem}>
      <View style={styles.bikeItemLeft}>
        <FirebaseImg photo={bike.photo}></FirebaseImg>
        <View style={styles.bikeItemCenter}>
          <Text style={styles.bikeItemText}>{bike.name}</Text>
          <Rating stars={bike.agg_rating} maxStars={5} size={20} color={'#00BFA6'}/>
        </View>
      </View>
        <TouchableOpacity onPress={() => navigation.navigate('Bike Info', {bike: bike})} >
            <Icon name='chevron-right' size={20} style={styles.bikeItemIcon} />
        </TouchableOpacity>
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
  bikeItemImage: {
    width: 85,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
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