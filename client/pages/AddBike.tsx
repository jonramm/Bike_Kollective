import React, { useState, useEffect, useContext } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Image,
    SafeAreaView,
    StatusBar,
    Alert,
    LogBox,
    Keyboard, 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import tagData from '../constants/tags';
import { addBike, uploadImage } from '../services/bikes';
import 'react-native-get-random-values'; // must come before uuid import below
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../navigation/AuthProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';
import { colors } from '../styles/base';


const AddBike = ({ route, navigation }) => {

    // Since we're already using key 'canceled'
    // we can safely ignore this warning.
    LogBox.ignoreLogs([
        'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
    ]);

    const { userProfile } = useContext(AuthContext);

    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setIsLoaded] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lockCombo, setLockCombo] = useState('');
    const [tags, setTags] = useState([]);
    const [location, setLocation] = useState(null);

    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(tagData);

    // for image picker
    const [image, setImage] = useState(null);

    // We're passing setSignature down the component tree
    // so we can have that signature here to upload to db.
    const [signature, setSignature] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAddBike = async () => {
        if (!(name && description && lockCombo && image && signature)) {
            Alert.alert('Error', 'Please complete the form, add an image, and sign the waiver.', [
                {text: 'Cancel', style: 'cancel'}
            ]);
            return;
        }
        setIsLoading(true);
        const imgId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        const body = {
            name: name,
            description: description,
            lock_combo: lockCombo,
            tags: tags,
            owner: userProfile.user_id,
            photo: imgId,
            release: false,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        };
        uploadImage(image, imgId)
            .then(() => {
                addBike(body).then((response) => {
                    if (response.status === 201) {
                        setIsLoading(false);
                        setIsLoaded(true);
                    } else {
                        setErrorLoading(true);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                setErrorLoading(true);
            })
    }

    const onOk = (sig) => {
        setSignature(sig);
        console.log('Signed!')
        navigation.goBack();
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Text style={[styles.headerLarge, styles.centerAlignText]}>Adding bike...</Text>
            </View>
        )
    }

    if (loaded) {
        return (
            <View style={styles.splashContainer}>
                <Text style={[styles.headerLarge, styles.centerAlignText]}>Bike successfully added!</Text>
                <Button 
                    title='Back to search'
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    if (errorLoading) {
        return (
            <View style={styles.splashContainer}>
                <Text style={[styles.headerLarge, styles.centerAlignText]}>Error adding bike!</Text>
                <Button 
                    title='Back to search'
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.containerForm}
            behavior="padding">

            <SafeAreaView>
                <Text style={styles.headerLarge}>Add a Bike</Text>
            </SafeAreaView>
            <StatusBar
                backgroundColor={colors.white}
                barStyle='dark-content'
            />
            <View style={styles.inputContainer}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <TextInput
                        placeholder="Bike name"
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.textInputForm}
                    />
                    <TextInput
                        placeholder="Bike description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={styles.textInputForm}
                    />
                    <TextInput
                        placeholder="Bike lock combo"
                        value={lockCombo}
                        onChangeText={text => setLockCombo(text)}
                        style={styles.textInputForm}
                    />
                </TouchableWithoutFeedback>
                <View style={styles.dropdownWrapperNoPadding}>
                    <DropDownPicker
                        maxHeight={200}
                        style={styles.dropdownInputLight}
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
                        showBadgeDot={false}
                        onPress={() => Keyboard.dismiss()}
                    />
                </View>
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage} />
                <View style={styles.imageContainer}>
                    {image &&
                        <Image
                            source={{ uri: image }}
                            style={styles.imgSizeLandscapeMedium} />
                    }
                </View>
                {!signature
                    ?
                    <Button
                        title='Sign waiver'
                        onPress={() => {
                            navigation.navigate(
                                'Release Waiver',
                                {onOk: onOk, waiverType: 'bike'}
                            )
                        }}
                    />
                    :
                    <View style={styles.signedContainer}>
                        <Text style={styles.textMedium}>Waiver Signed!</Text>
                    </View>
                }
            </View>
            <View style={styles.buttonBottomContainer}>
                <TouchableOpacity
                    onPress={handleAddBike}
                    style={styles.buttonBottom}
                >
                    <Text style={styles.buttonBottomText}>Add Bike</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddBike;