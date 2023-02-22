import { View, Text  } from 'react-native';
import { useContext } from 'react';
import { Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { Rating } from 'react-native-stock-star-rating';
import { distToBike } from '../services/distanceCalc';
import FirebaseImg from './FirebaseImg';
import { AuthContext } from '../navigation/AuthProvider';
import { styles } from '../styles/styles';
import {colors, iconSizes} from '../styles/base';


const BikePopup = (props) => {
    const bike = props.bike;
    const {userLocation} = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <Callout
            tooltip={true}
            onPress={() => {
                navigation.navigate(
                    'Bike Info' as never, 
                    {
                        bike: bike,
                    } as never)}
                }
        >
            <View style={styles.popupContainer}>
                <View style={styles.popupDisplayContainer}>
                    <FirebaseImg 
                        photo={bike.photo}
                        imgStyle={styles.imgSizeBikePopup}
                    />
                    <Text style={styles.headerLarge}>{bike.name}</Text>
                    <Text 
                        style={
                            (bike.status === 'available') 
                            ? styles.textAvailable : styles.textUnavailable
                            }
                    >
                        {bike.status}
                    </Text>
                    
                    <Rating 
                        stars={bike.agg_rating} 
                        maxStars={5} size={iconSizes.md} 
                        color={(bike.agg_rating > 4) ? colors.green
                            : (bike.agg_rating > 3) ? colors.yellow
                            : colors.red}/>
                    <Text style={styles.textHighlightSmall}>
                        {distToBike(userLocation, bike.location)} meters away
                    </Text>
                    <Text style={[styles.textHighlightSmall, styles.textItalic]}>{bike.description}</Text>
                </View>
            </View>
        </Callout>
    )
}

export default BikePopup;