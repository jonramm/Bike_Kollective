import { StyleSheet, Alert, View, Text, Pressable, Button } from 'react-native';
import { Callout } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons'; 
import { Bike } from '../types/types';

const BikePopup = (props: Bike) => {
    return (
        <Callout
            tooltip={true}
        >
            <View style={styles.popupContainer}>
                <View style={styles.display}>
                    <Text style={styles.header}>{props.name}</Text>
                    <Text 
                        style={
                                (props.status == 'available') 
                                ? styles.available : styles.unavailable
                            }
                    >
                        {props.status}
                    </Text>
                    <Text style={styles.description}>{props.description}</Text>
                    <Text
                        style={
                            (props.agg_rating > 4)
                            ? styles.good : styles.bad
                        }
                    >Rating: {props.agg_rating}</Text>
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
        textAlign: 'center',
        justifyContent: 'center'
      },
    display: {
        flexDirection: 'column',
        gap: 100,
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
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
    },
    good: {
        color: 'green'
    },
    bad: {
        color: 'orange'
    }
  });

  export default BikePopup;