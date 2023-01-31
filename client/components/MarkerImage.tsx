// user and bike images from Flaticon, must attribute
// <a href="https://www.flaticon.com/free-icons/user" title="user icons">
// User icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/bicycle" title="bicycle icons">
// Bicycle icons created by Muhammad_Usman - Flaticon</a>

import { Image } from 'react-native';

const MarkerImage = (props) => {
    return (
        <Image 
            style={props.styles.img}
            source={props.img} 
        />
    )
} 

export default MarkerImage;