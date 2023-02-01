import React from "react";
import { View, StyleSheet, FlatList} from 'react-native';
import BikeItem from '../components/BikeItem';
import { bikes } from '../data/testBikes';


const ListBikes = ({navigation}) => {
    return (
        <View style={styles.bikesContainer}>
            <FlatList style={styles.bikesWrapper}
                keyExtractor={item => item.bike_id}
                data={bikes}
                renderItem={({item}) => (<BikeItem name={item.name} photo={item.photo}></BikeItem>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bikesContainer: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      bikesWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
      },
})

export default ListBikes;