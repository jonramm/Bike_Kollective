import React, {useEffect, useState, useContext} from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    LogBox, 
    Pressable, 
    Modal, 
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseImg from '../components/FirebaseImg';
import DropDownPicker from 'react-native-dropdown-picker';
// @ts-ignore
import {Rating} from 'react-native-stock-star-rating';
import {addRide} from '../services/rides';
import {patchBike} from '../services/bikes';
import {AuthContext} from '../navigation/AuthProvider';
import {distToBike} from '../services/distanceCalc';
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';
import { MAX_BIKE_DISTANCE } from "../constants/distance";
import issueData from '../constants/issues';


const BikeInfo = ({route, navigation}) => {

    // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
    // We're not currently using state persistence so I'm suppressing this error,  
    // but it would be cool if we eventually persisted the countdown timer.
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const startTimer = route.params.startTimer;

    const {userProfile} = useContext(AuthContext);
    const {userLocation} = useContext(AuthContext);
    const {bike} = route.params;
    const [distance, setDistance] = useState(null);

    // for modal and dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(issueData);
    const [bikeStatus, setBikeStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const goBack = navigation.addListener('gestureEnd', (e) => {
            navigation.goBack();
        });
        return goBack;
    }, [navigation]);

    useEffect(() => {
        var dist = distToBike(userLocation, bike.location);
        setDistance(dist);
    }, []);

    useEffect(() => {
        setBikeStatus(bike.status);
    }, []);

    const handleStartTrip = () => {
        if (distance > MAX_BIKE_DISTANCE) {
            alert('User not close enough to bike');
            return
        }
        const patchBikeParams = {
            status: 'checked out', 
            owner: userProfile.user_id,
            tags: bike.tags                 // TODO - update so that tags are not required in request.body
        };
        const addRideParams = {
            start_time: null,
            end_time: null,
            rating: null,
            bike: bike.bike_id,
            rider: userProfile.user_id,
            location_start: {
                latitude: bike.latitude,
                longitude: bike.longitude
            },
            location_end: null,
        };
        Promise.all([patchBike(bike.bike_id, patchBikeParams), addRide(addRideParams)]).then(responses => {
            if (responses[0].status === 201 && responses[1].status === 201){
                startTimer(); // If everything is groovy we start the ride timer here
                navigation.navigate('Booking', {screen: 'Return Bike'}, {bike: bike});
            }
        })
        .catch(error => alert(error.message));
    }

    const onStartTripButton = async () => {
        handleStartTrip();
    }

    const handleReportDamages = async () => {
        if (bikeStatus !== 'available') {
            const patchBikeParams = {
                status: bikeStatus, 
                tags: []                
            };
            patchBike(bike.bike_id, patchBikeParams)
            .then(response => {
                if (response.status === 201){
                    Alert.alert('Issue successfully reported');
                }
            })
            .catch(error => alert(error.message));
        }
        else {
            Alert.alert('No issue reported.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />

            <FirebaseImg photo={bike.photo} imgStyle={styles.imgSizeLandscapeFullBleed}></FirebaseImg>

            <View style={[styles.containerFlex, styles.paddingMedium]}>
                <View style={[styles.containerColsNoPadding, styles.containerFlex]}>
                    <View style={[styles.containerColsXSmall, styles.headerContainerMedium]}>

                        <Text style={styles.headerXLarge}>{bike.name}</Text>

                        <View style={styles.containerRowsMedium}>
                            <View style={styles.containerRowsMedium}>
                                <Icon name='map-marker' size={iconSizes.md} style={[styles.itemRowSpaceRight, styles.iconGreen]} />
                                <Text style={styles.textHightlightMedium}>
                                    {distToBike(userLocation, bike.location)} meters
                                </Text>
                            </View>
                            <Text style={styles.textHightlightMedium}>{bikeStatus}</Text>
                            <View>
                                <Rating stars={bike.agg_rating} maxStars={5} size={iconSizes.md} color={colors.green} />
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={[styles.containerFlex, styles.textScrollContainer]}>
                        <Text style={styles.textMedium}>{bike.description}</Text>
                </ScrollView>
            </View>

            {!userProfile.waiver ? <Text style={[styles.centerAlignText, styles.centerJustify, styles.textSmall, styles.headerContainerSmall]}>You must sign the accident waiver before continuing!</Text> : null} 

            <View style={[styles.containerRowsNoPadding, styles.buttonBottomContainer]}>
                <View style={[styles.buttonBottom, styles.itemRowSpaceRight, !userProfile.waiver || bikeStatus !== 'available' ? styles.buttonGray : styles.buttonGreen]} >  
                    <Pressable onPress={() => onStartTripButton()} disabled={!userProfile.waiver || bikeStatus !== 'available'}>
                        <Text style={styles.buttonBottomText}>Start Trip</Text>
                    </Pressable>
                </View>
                <View style={[styles.buttonBottom, styles.itemRowSpaceLeft, !userProfile.waiver || bikeStatus !== 'available' ? styles.buttonGray : styles.buttonRed]}> 
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Select an issue</Text>
                                <View style={styles.dropdownWrapperModal}>
                                    <DropDownPicker
                                        maxHeight={200}
                                        style={styles.dropdownInputDark}
                                        textStyle={styles.dropdownText}
                                        badgeColors={colors.blue_dark}
                                        badgeTextStyle={styles.dropdownLabelStyle}
                                        placeholder="No issue selected"
                                        open={open}
                                        value={bikeStatus}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setBikeStatus}
                                        setItems={setItems}
                                        mode='BADGE'
                                        showBadgeDot={true}
                                        min={1}
                                    />
                                </View>
                                <Pressable
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => {
                                        handleReportDamages();
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                <Text style={styles.textStyle}>Submit Issue</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable onPress={() => setModalVisible(true)} disabled={!userProfile.waiver || bikeStatus !== 'available'}>
                        <Text style={styles.buttonBottomText}>Report Issue</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default BikeInfo;