// user and bike images from Flaticon, must attribute
// <a href="https://www.flaticon.com/free-icons/user" title="user icons">
// User icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/bicycle" title="bicycle icons">
// Bicycle icons created by Muhammad_Usman - Flaticon</a>

import { Image, StyleSheet } from 'react-native';

const MarkerImage = (props) => {
    return (
        <Image 
            style={styles.img}
            source={props.img} 
        />
    )
} 

const styles = StyleSheet.create({
    img: {
      width: 30,
      height: 30,
    },
  });

export default MarkerImage;