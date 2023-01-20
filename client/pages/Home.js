import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

function Home () {
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
    )
}



export default Home