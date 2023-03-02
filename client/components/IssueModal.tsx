import React, {useEffect, useState, useContext} from "react";
import {
    View,
    Text,
    TextInput,
    Pressable, 
    Modal, 
    Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {AuthContext} from '../navigation/AuthProvider';
import {getBike, patchBike} from '../services/bikes';
import { addReport } from "../services/reports";
import issueData from '../constants/issues';
import {styles} from '../styles/styles';
import {colors, iconSizes} from '../styles/base';

const IssueModal = ({route, navigation}) => {
    const {user} = useContext(AuthContext);
    const {userProfile} = useContext(AuthContext);
    const {bike} = route.params;
    // for modal and dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(issueData);
    const [bikeStatus, setBikeStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [issues, setIssues] = useState('');

    const getBikeStatus = async () => {
        const updatedBike = await getBike(bike.bike_id);
        console.log(updatedBike.data);
        setBikeStatus(updatedBike.data.status);
    }

    useEffect(() => {
        getBikeStatus();
    }, [user]);

    useEffect(() => {
        setBikeStatus(bike.status);
    }, []);

    const handleReportDamages = async () => {
        if (bikeStatus !== 'available') {
            const patchBikeParams = {
                status: bikeStatus, 
                tags: []                
            };
            const report_params = {status: bikeStatus, description: issues, user: user.uid, bike: bike.bike_id};
            Promise.all([patchBike(bike.bike_id, patchBikeParams), addReport(report_params)])
                .then(responses => {
                    if (responses[0].status === 201 && responses[1].status === 201) {
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
        <View style={[styles.buttonBottom, styles.itemRowSpaceLeft, !userProfile.waiver || bikeStatus !== 'available' ? styles.buttonGray : styles.buttonRed]}> 
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                            <TextInput  
                                placeholder="Enter issue description"
                                onChangeText={text => setIssues(text)} 
                                editable = {true}  
                                maxLength = {250}  
                                numberOfLines = {2} 
                                style={styles.textInputForm}
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
    )
}

export default IssueModal;