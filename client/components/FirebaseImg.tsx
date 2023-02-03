import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from 'react-native';
import { storage } from '../configs/firebase';
import { ref, getDownloadURL } from "firebase/storage";

const FirebaseImg = (props) => {

    const [imageUrl, setImageUrl] = useState(undefined);
    const imgName = props.photo;

    const getImageURL = async (imgId) => {
        try {
            const storageRef = ref(storage, '/' + imgId);
            const url = getDownloadURL(storageRef);
            return url;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
           const url = await getImageURL(imgName);
           setImageUrl(url);
        }
        fetchData();
      }, []);
  
    return (
        <Image style={styles.bikeItemImage} source={{uri: imageUrl}} />
    )
  }
  
  const styles = StyleSheet.create({
    bikeItemImage: {
        width: 85,
        height: 60,
        borderRadius: 5,
        marginRight: 15,
      },
  });
  
  export default FirebaseImg;