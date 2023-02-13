import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateTimeDisplay = ({ value }) => {
  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownText}>{value.toString().padStart(2, '0')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    paddingHorizontal: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  countdownText: {
    color: '#3F3D53',
    fontWeight: '700',
    fontSize: 16,
  }
});

export default DateTimeDisplay;
