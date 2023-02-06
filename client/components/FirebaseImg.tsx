import React, { useState, useEffect } from "react";
import { Image } from 'react-native';
import { storage } from '../configs/firebase';
import { ref, getDownloadURL } from "firebase/storage";

const FirebaseImg = (props) => {

    const [imageUrl, setImageUrl] = useState(undefined);
    const imgName = props.photo;
    const imgProps = props.imgProps;

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
        <Image           
            style={{
                height: imgProps.height,
                width: imgProps.width,
                borderRadius: imgProps.borderRadius,
                marginRight: imgProps.marginRight,
                aspectRatio: imgProps.aspectRatio,
            }} 
            source={{uri: imageUrl}} 
        />
    )
  }
  
  export default FirebaseImg;