import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const CalendarButtonRed = ({ title, onPress }) => (
  <TouchableOpacity style={styles.containerRed} onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default CalendarButtonRed;
