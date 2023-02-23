import React from "react";
import { 
    View, 
    Text,
    ImageBackground,
    Image
} from "react-native";
import { styles } from '../styles/styles';


const background = require('../assets/background.png');
const logo = require('../assets/Logo_TBK.png');

const TitleScreen = () => {
    return (
        <ImageBackground 
                source={background} 
                resizeMode="cover"
                style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
                <Image 
                    source={logo}
                    style={styles.titleLogo}
                    />
                <View style={styles.titleNamesContainer}>
                    <Text style={styles.headerLarge}>Created By:</Text>
                    <Text style={styles.headerMedium}>Anita Ly</Text>
                    <Text style={styles.headerMedium}>Jon Ramm</Text>
                    <Text style={styles.headerMedium}>Kristin Schaefer</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

export default TitleScreen;