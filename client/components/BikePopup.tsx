import { StyleSheet, Alert, View, Text, Pressable, Button } from 'react-native';
import { Callout, CalloutSubview } from 'react-native-maps';
import { CgChevronRight } from 'react-icons/cg'
import { Bike } from '../types/types';

const BikePopup = (props: Bike) => {
    return (
        <Callout
            tooltip={true}
        >
            <View style={styles.customView}>
                <Text>{props.name}</Text>
                <Text>{props.status}</Text>
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
    customView: {
        width: 150,
        height: 'auto',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center'
      },
  });

  export default BikePopup;