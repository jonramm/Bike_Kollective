import { View, Text  } from 'react-native';
import { useContext } from 'react';
import { Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
//@ts-ignore
import { Rating } from 'react-native-stock-star-rating';
import { distToBike } from '../services/distanceCalc';
import FirebaseImg from './FirebaseImg';
import { AuthContext } from '../navigation/AuthProvider';
import { styles } from '../styles/styles';


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
                <View style={styles.display}>
                    <FirebaseImg 
                        photo={bike.photo}
                        imgStyle={styles.imgSizeBikePopup}
                    />
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
                        Bike is {distToBike(userLocation, bike.location)} meters away
                    </Text>
                </View>
            </View>
        </Callout>
    )
}

export default BikePopup;