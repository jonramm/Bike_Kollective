import React, {useState, useEffect} from 'react';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View,
    TouchableOpacity,
    Button,
    Image
 } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { firebase, auth } from '../configs/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import tagData from '../constants/tags';

const AddBike = ({route, navigation}) => {

    const { first_name, user_id } = route.params

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lockCombo, setLockCombo] = useState('');
    const [tags, setTags] = useState([]);

    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(tagData);

    // for image picker
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            }
    };

    return (

        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding">
            
            <View>
                <Text style={styles.labelContainer}>Hey {first_name}!</Text>
                <Text style={styles.inputContainer}>Fill out this form to add your bike to the database:</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Lock Comboe"
                    value={lockCombo}
                    onChangeText={text => setLockCombo(text)}
                    style={styles.input}
                />
                <Text style={styles.labelContainer}>Tags:</Text>
                <DropDownPicker
                    style={styles.input}
                    multiple={true}
                    min={0}
                    max={3}
                    open={open}
                    value={tags}
                    items={items}
                    setOpen={setOpen}
                    setValue={setTags}
                    setItems={setItems}
                    />
                <Button 
                    title="Pick an image from camera roll" 
                    onPress={pickImage} />
                {image && 
                    <Image 
                        source={{ uri: image }} 
                        style={{ width: 200, height: 200 }} />
                }

                <TouchableOpacity
                    // onPress={}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Add Bike</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: .6,
        padding: 20,
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    labelContainer: {
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})

export default AddBike;