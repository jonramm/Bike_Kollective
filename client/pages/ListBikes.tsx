import React, { useState, useEffect, useContext } from "react";
import {
    View,
    FlatList,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import BikeItem from '../components/BikeItem';
import { getAvailableBikesWithinProximity } from "../services/bikes";
import DropDownPicker from 'react-native-dropdown-picker';
import tagData from '../constants/tags';
import { styles } from '../styles/styles';
import { colors, iconSizes, margins } from '../styles/base';
import { useNavigation } from "@react-navigation/native";
import { BIKE_RADIUS } from '../constants/distance';
import { AuthContext } from '../navigation/AuthProvider';

const ListBikes = () => {

    const navigation = useNavigation();

    const { userLocation } = useContext(AuthContext);

    const [bikeArray, setBikeArray] = useState([]);
    const [selectedBikes, setSelectedBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(tagData);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAvailableBikesWithinProximity(BIKE_RADIUS, userLocation)
            .then(data => {
                if (data) {
                    setBikeArray(data.sort((a, b) => b.agg_rating - a.agg_rating));             // Sort by agg_rating 
                    setSelectedBikes(data.sort((a, b) => b.agg_rating - a.agg_rating));
                }
            })
            .then(() => {setIsLoading(false)})
            .catch(err => console.log(err));
    }, []);

    const handleEmpty = () => {
        return <Text style={styles.headerMedium}>Sorry there are no bikes available.</Text>;
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
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
                {
                    isLoading ?
                        <View style={styles.spinnerContainer}>
                            <ActivityIndicator size='large' color={colors.green}/>
                        </View>
                        :
                        <View style={{flex: 1}}>
                            <View style={styles.buttonTop}>
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
                                        size={iconSizes.xl}
                                        color={colors.blue_dark}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dropdownWrapper}>
                                <Text style={[styles.headerMedium, styles.centerAlignText]}>Filter Search by Tags</Text>
                                <DropDownPicker
                                    maxHeight={200}
                                    style={styles.dropdownInputDark}
                                    textStyle={styles.dropdownText}
                                    badgeColors={colors.blue_dark}
                                    badgeTextStyle={styles.dropdownLabelStyle}
                                    placeholder="Select tags"
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
                            <View style={{flex: 1}}>
                                <FlatList style={styles.listWrapper}
                                    ListEmptyComponent={handleEmpty}
                                    keyExtractor={item => item.bike_id}
                                    data={selectedBikes}
                                    extraData={selectedBikes}
                                    renderItem={
                                        ({item}) => (
                                            <BikeItem 
                                                bike={item} 
                                                hasLink={true}
                                                hasBikeLocInfo={true}
                                                >
                                            </BikeItem>)}
                                    ListFooterComponent={<View style={{ height: 0, marginBottom: margins.md }}></View>}
                                />
                            </View>
                        </View>
                }
        </SafeAreaView>
    )
}

export default ListBikes;