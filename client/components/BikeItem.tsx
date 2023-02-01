import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bike } from '../types/types';

const BikeItem = (props: Bike) => {
  return (
    <View style={styles.bikeItem}>
      <View style={styles.bikeItemLeft}>
        <Image style={styles.bikeItemImage} source={{ uri: props.photo }} />
        <Text style={styles.bikeItemText}>{props.name}</Text>
      </View>
        <TouchableOpacity onPress={() => alert('Todo: link to bike info page.')} >
            <Icon name='chevron-right' size={20} style={styles.bikeItemIcon} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    bikeItem: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bikeItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  bikeItemImage: {
    width: 85,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  bikeItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  bikeItemIcon: {
    color: '#d6d7da'
  },
});

export default BikeItem;