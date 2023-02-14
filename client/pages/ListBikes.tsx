import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import BikeItem from '../components/BikeItem';
import { getBikes, getBikesWithinProximity } from "../services/bikes";
import DropDownPicker from 'react-native-dropdown-picker';
import tagData from '../constants/tags';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import {BIKE_RADIUS} from '../constants/distance';

const ListBikes = ({route}) => {

    const navigation = useNavigation();

    const {userLocation} = route.params;

    const [bikeArray, setBikeArray] = useState([]);
    const [selectedBikes, setSelectedBikes] = useState([]);

    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(tagData);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getBikesWithinProximity(BIKE_RADIUS, userLocation)
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
        if (tags) {
            setSelectedBikes([...bikeArray].filter((x) => checkSubset(x.tags, tags) === true));
        }
        else {
            setSelectedBikes(bikeArray);        // Reset the bike list because no tags are selected
        }
    };

    return (
        <SafeAreaView style={styles.bikesContainer}>
            <StatusBar
                backgroundColor='white'
                barStyle='dark-content'
            />
            <View style={styles.mapButton}>
                <TouchableOpacity
                    // Had to apply type 'never' to string param for navigate.
                    // Seems like a weird React/TypeScript issue and this is
                    // a quick workaround as found here:
                    // https://stackoverflow.com/questions/68667766/react-native-typescript-string-is-not-assignable-to-parameter-of-type-never
                    onPress={() => {
                        navigation.navigate(
                            'Search' as never,
                            { screen: 'Map' } as never
                        )
                    }
                    }
                >
                    <Ionicons
                        name='map'
                        size={40}
                        color='black'
                    />
                </TouchableOpacity>
            </View>
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
                data={selectedBikes}
                extraData={selectedBikes}
                renderItem={({ item }) => (<BikeItem bike={item} hasLink={true}></BikeItem>)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bikesContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    dropdownWrapper: {
        paddingTop: 20,
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
    mapButton: {
        alignItems: 'center'
    }
})

export default ListBikes;