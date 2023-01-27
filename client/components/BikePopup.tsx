import { StyleSheet, Alert, View, Text, Pressable, Button } from 'react-native';
import { Callout } from 'react-native-maps';
import { CgChevronRight } from 'react-icons/cg'
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
                    <Text>{props.description}</Text>
                </View>
                <Button 
                    title='Check Out Bike!'
                    color='blue'
                    onPress={_ => {
                        Alert.alert('button pressed');
                        }}
                />
            </View>
        </Callout>
    )
}

const styles = StyleSheet.create({
    popupContainer: {
        width: 150,
        height: 'auto',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center'
      },
    display: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    available: {
        fontSize: 16,
        color: 'green'
    },
    unavailable: {
        fontSize: 16,
        color: 'red'
    }
  });

  export default BikePopup;