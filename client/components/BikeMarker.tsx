import { useState } from 'react';
import { Marker } from 'react-native-maps';
import MarkerImage from './MarkerImage';
import { StyleSheet } from 'react-native';
import BikePopup from './BikePopup';

const bikeImage = require('../assets/bike.png')

const BikeMarker = (props) => {
    const bike = props.bike;
    const [selected, setSelected] = useState(false)
    return (
        <Marker 
            coordinate={{
                'latitude': bike.location.latitude, 
                'longitude': bike.location.longitude
            }}
            title={bike.name}
            onSelect={() => setSelected(true)}
            onDeselect={() => setSelected(false)}
        >   
            <MarkerImage
                img={bikeImage}
                styles={(selected) ? stylesSelected : stylesDeselected}
            />
            <BikePopup {...{...props}} />
        </Marker>
    )
}

const stylesSelected = StyleSheet.create({
    img: {
      width: 80,
      height: 80,
    }
  });

const stylesDeselected = StyleSheet.create({
img: {
    width: 50,
    height: 50,
}
});

export default BikeMarker;