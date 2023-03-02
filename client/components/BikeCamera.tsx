// Camera code adapted from code found at:
// https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/

import React from "react";
import { 
    View,
    TouchableOpacity ,
    Text
} from "react-native";
import { Camera } from "expo-camera";
import { styles } from '../styles/styles';

const BikeCamera = (props) => {

    return (
        <Camera
                style={{flex: 1,width:"100%"}}
                ref={(r) => {
                    props.setCamera(r)
                    }}
                ratio='4:3'
            >
                <View
                    style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                    }}
                >
                <View
                    style={[styles.cameraButtons]}
                >   
                    <TouchableOpacity
                        style={[styles.buttonBottom, styles.buttonRed]}
                        onPress={() => props.setStartCamera(false)}>
                        <Text style={styles.buttonBottomText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.takePicture()}
                        style={styles.buttonBottom}
                    >
                        <Text style={styles.buttonBottomText}>Capture</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </Camera>
    );
}

export default BikeCamera;