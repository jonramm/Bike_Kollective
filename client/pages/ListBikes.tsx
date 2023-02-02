import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList} from 'react-native';
import BikeItem from '../components/BikeItem';
import { getBikes } from "../services/bikes";


const ListBikes = ({navigation}) => {
    const [bikeArray, setBikeArray] = useState([]);

    useEffect(() => {
        getBikes()
            .then(data => setBikeArray(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={styles.bikesContainer}>
            <FlatList style={styles.bikesWrapper}
                keyExtractor={item => item.bike_id}
                data={bikeArray}
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