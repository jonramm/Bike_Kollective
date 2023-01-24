import React from "react";
import { View, Text, Button } from 'react-native';

const Home = ({navigation}) => {
    return (
        <View>
            <Text>Home!</Text>
            <Button
                title="Go to map page"
                onPress={() =>
                    navigation.navigate('Map')
                }
            />
        </View>
    )
}

export default Home;