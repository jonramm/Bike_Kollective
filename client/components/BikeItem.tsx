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
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';


const BikeItem = (props) => {

  const navigation = useNavigation();
  const bike = props.bike;
  const {userLocation} = useContext(AuthContext);
  const imgProps : FirebaseImgProps = {
    width: 120,
    height: 90,
    borderRadius: 5,
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
      <Icon name='chevron-right' size={iconSizes.md} style={[styles.iconGrayDark, styles.itemRowSpaceLeft]} />
    </TouchableOpacity>
  ) : null;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerRowsNoWrap}>
        <FirebaseImg photo={bike.photo} imgProps={imgProps}></FirebaseImg>
        <View style={styles.containerColsSmallCard}>
          <Text style={styles.headerMediumWrapText}>{bike.name}</Text>
          <Rating stars={bike.agg_rating} maxStars={5} size={15} color={colors.green}/>
          <Text style={styles.textHighlightXSmall}>{distToBike(userLocation, bike.location)} meters away</Text>
          <Text style={styles.textHighlightXSmall}>{bike.status}</Text>
        </View>
      </View>
        {hasBikeInfoLink}
    </View>
  )
}

export default BikeItem;