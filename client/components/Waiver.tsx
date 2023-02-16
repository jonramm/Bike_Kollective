import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Image,
  LogBox
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sign from "./Sign";

const waiver = require('../assets/bike_waiver.png');

const Waiver = ({route}) => {

  // As per https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  // Since we're not using state persistence or deep linking
  // we can safely ignore this warning.
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.preview}>
        <Image
            resizeMode={"contain"}
            style={{ width: '100%', height: '100%' }}
            source={waiver}
        />
      </View>
      <Sign
        onOK={route.params.onOk}
      />
      <Button 
        title='Go back'
        onPress={() => navigation.goBack()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  preview: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }
});

export default Waiver;