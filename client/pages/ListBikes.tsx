import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from 'react-native';
import BikeItem from '../components/BikeItem';
import { getBikes } from "../services/bikes";
import DropDownPicker from 'react-native-dropdown-picker';
import tagData from '../constants/tags';
import { useNavigation } from "@react-navigation/native";


const ListBikes = () => {

    const navigation = useNavigation();

    const [bikeArray, setBikeArray] = useState([]);
    const [selectedBikes, setSelectedBikes] = useState([]);
    
    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(tagData);
    const [tags, setTags] = useState([]);
    
    useEffect(() => {
        getBikes()
            .then(data => {
                setBikeArray(data.sort((a, b) => b.agg_rating - a.agg_rating));             // Sort by agg_rating 
                setSelectedBikes(data.sort((a, b) => b.agg_rating - a.agg_rating));
            })
            .catch(err => console.log(err));
    }, []);

    const handleEmpty = () => {
        return <Text style={styles.dropdownInput}>Sorry there are no bikes available.</Text>;
    };

    const filterBikes = () => {
        let checkSubset = (parentArray, subsetArray) => {
            return subsetArray.every((x) => {
                return parentArray.includes(x)
            })
        };
        if (tags){
            setSelectedBikes([...bikeArray].filter((x) => checkSubset(x.tags, tags) === true));
        }
        else{
            setSelectedBikes(bikeArray);        // Reset the bike list because no tags are selected
        }
    };

    return (
        <View style={styles.bikesContainer}>
            <View style={styles.dropdownWrapper}>
                <Text style={styles.dropdownLabel}>Filter Search by Tags</Text>
                <DropDownPicker
                    maxHeight={300}
                    style={styles.dropdownInput}
                    multiple={true}
                    min={0}
                    max={3}
                    open={open}
                    value={tags}
                    items={items}
                    setOpen={setOpen}
                    setValue={setTags}
                    setItems={setItems}
                    mode='BADGE'
                    onChangeValue={filterBikes}
                    showBadgeDot={false}
                    />
            </View>
            <FlatList style={styles.bikesWrapper}
                ListEmptyComponent={handleEmpty}
                keyExtractor={item => item.bike_id}
                data={selectedBikes}            // TODO: filter by distance
                extraData={selectedBikes}
                renderItem={({item}) => (<BikeItem bike={item} hasLink={true}></BikeItem>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bikesContainer: {
        flex: 1,
        backgroundColor: '#FFF',
      },
    dropdownWrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
        zIndex: 100,
        marginBottom: 30,
    },
    bikesWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    dropdownInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    dropdownLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
})

export default ListBikes;