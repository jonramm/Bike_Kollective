import React, { useState, useEffect } from "react";
import { Image } from 'react-native';
import { storage } from '../configs/firebase';
import { ref, getDownloadURL } from "firebase/storage";

const FirebaseImg = (props) => {

    const [imageUrl, setImageUrl] = useState(undefined);
    // const imgName = props.photo;
    const imgProps = props.imgProps;
    const imgName = props.imgProps.imgName;

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
            style={{
                height: imgProps.height,
                width: imgProps.width,
                borderRadius: imgProps.borderRadius,
                marginRight: imgProps.marginRight,
                marginBottom: imgProps.marginBottom,
                aspectRatio: imgProps.aspectRatio,
            }} 
            source={{uri: imageUrl}}
        />  
    )
  }
  
  export default FirebaseImg;