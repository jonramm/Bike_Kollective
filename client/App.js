import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function App() {

  const [greeting, setGreeting] = useState("Hello World!");

  useEffect(() => {
    const getHello = async () => {
      try{
        const res = await axios.get('http://192.168.1.37:3000/')
        setGreeting(res.data)
      } catch(error) {
        console.log(error)
      }
    }
    getHello()
  })

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
