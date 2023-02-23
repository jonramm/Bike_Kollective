import React from "react";
import { 
    View, 
    Text,
    StyleSheet ,
    ImageBackground,
    Image
} from "react-native";

const background = require('../assets/background.png');
const logo = require('../assets/Logo_TBK.png');

const TitleScreen = () => {
    return (
        <ImageBackground 
                source={background} 
                resizeMode="cover"
                style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
                {/* <Text style={styles.welcome}>Welcome to</Text>
                <Text style={styles.title}>Bike Kollective</Text> */}
                <Image 
                    source={logo}
                    style={styles.logo}
                    />
                <View style={styles.namesContainer}>
                    <Text>Created By:</Text>
                    <Text>Anita Ly</Text>
                    <Text>Jon Ramm</Text>
                    <Text>Kristin Schaefer</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40,
    },
    namesContainer: {
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
      },
    logo: {
        width: 240,
        height: 240
    }
  });

export default TitleScreen;