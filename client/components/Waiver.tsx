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

const Waiver = () => {

  const [signature, setSign] = useState(null);
  const [value, onChangeText] = useState('Useless Placeholder');
  const [desc, setDesc] = useState("Please Sign");
  const navigation = useNavigation();

  const handleSignature = signature => {
    console.log(signature);
    setSign(signature);
    setDesc("sign success");
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.preview}>
        {/* {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 750, height: 100 }}
            source={waiver}
          />
        ) : null} */}
        <Image
            resizeMode={"contain"}
            style={{ width: '100%', height: '100%' }}
            source={waiver}
        />
      </View>
      <Sign
        onOK={handleSignature}
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
    height: 50,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flex: 1,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

export default Waiver;