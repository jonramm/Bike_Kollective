import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import FirebaseImg from '../components/FirebaseImg';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
// @ts-ignore
import { Rating } from 'react-native-stock-star-rating';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../navigation/AuthProvider';
import { distToBike } from '../services/distanceCalc';
import { styles } from '../styles/styles';
import { colors, iconSizes } from '../styles/base';


const BikeItem = (props) => {

  const navigation = useNavigation();
  const bike = props.bike;
  const {userLocation} = useContext(AuthContext);
  const [bikeAddress, setBikeAddress] = useState(null);

  useEffect(() => {
    bikeAddressHandler();
  }, []);

  const bikeAddressHandler = async () => {
        Location.reverseGeocodeAsync({
          latitude: bike.location.latitude,
          longitude: bike.location.longitude,
        })
        .then(data => {
          const address = data[0];
          if (!!address) {
              let formattedAddress = '';
              if (!!address.name && address.name !== 'Unnamed Road') {
                  formattedAddress += address.name;
              }
              setBikeAddress(formattedAddress);
          }   
        })
        .catch(error => alert(error.message));
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
      <Icon name='chevron-right' size={iconSizes.md} style={styles.iconGrayDark} />
    </TouchableOpacity>
  ) : null;

  const hasBikeLocationInfo = props.hasBikeLocInfo? (
    <View>
      <Text style={styles.textHighlightXSmall}>{distToBike(userLocation, bike.location)} meters away</Text>
      <Text style={styles.textHighlightXSmall}>{bikeAddress}</Text>
      <Text style={styles.textHighlightXSmall}>{bike.status}</Text>
    </View>
  ) : null;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerRowsNoWrap}>
        <FirebaseImg photo={bike.photo} imgStyle={styles.imgSizeLandscapeMediumRadius}></FirebaseImg>
        <View style={props.hasBikeLocInfo? styles.containerColsSmallCard : styles.listWrapperPadding}>
          <Text adjustsFontSizeToFit={true} style={props.hasBikeLocInfo? styles.headerMedium : styles.headerLarge}>{bike.name}</Text>
          <Rating stars={bike.agg_rating} maxStars={5} size={props.hasBikeLocInfo? 15 : 20} color={colors.green}/>
          {hasBikeLocationInfo}
        </View>
      </View>
        {hasBikeInfoLink}
    </View>
  )
}

export default BikeItem;