import React from "react";
import { 
    View, 
    Text,
    StyleSheet 
} from "react-native";

const TitleScreen = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.title}>Bike Kollective</Text>
            <Text>Created By:</Text>
            <Text>Anita Ly</Text>
            <Text>Jon Ramm</Text>
            <Text>Kristin Schaefer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'green'
    }
  });

export default TitleScreen;