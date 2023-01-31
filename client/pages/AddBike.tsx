import React, {useState, useEffect} from 'react';
import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View,
    TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { firebase, auth } from '../configs/firebase';
import axios from "axios";
import tagData from '../constants/tags';

const AddBike = ({route, navigation}) => {

    const { first_name, user_id } = route.params

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lockCombo, setLockCombo] = useState('');
    const [tags, setTags] = useState([]);

    // for dropdown picker
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(tagData);


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
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    />

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