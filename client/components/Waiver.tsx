import React, { useRef, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Sign from "./Sign";

const waiver = require('../assets/bike_waiver.png');

const Waiver = ({route}) => {

  const [signature, setSignature] = useState(null);
  const navigation = useNavigation();

  const {onOk} = route.params;

  const handleSignature = (signature) => {
    setSignature(signature);
    onOk(signature)
  };

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
        onOK={onOk}
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