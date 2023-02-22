import React, { useState, useEffect } from "react";
import { Image } from 'react-native';
import { storage } from '../configs/firebase';
import { ref, getDownloadURL } from "firebase/storage";

const FirebaseImg = (props) => {

    const [imageUrl, setImageUrl] = useState(undefined);
    const imgName = props.photo;
    const imgStyle = props.imgStyle;

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
            // Style prop takes a list of style objects, the last of which 
            // takes precedence. In this case, it will override the default 
            // height and width values if they are present as component props.
            style={imgStyle}
            source={{uri: imageUrl}} />
    )
  }
  
  export default FirebaseImg;