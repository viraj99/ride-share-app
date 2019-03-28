import React from 'react';
import { Text, View } from 'react-native';
import Touch from '../../utils/touch';
import styles from './styles';

const RideListItem = ({
  name,
  date,
  time,
  address,
  onPress,
  onLongPress,
  style,
  underlayColor,
}) => (
  <Touch
    onPress={onPress}
    underlayColor={underlayColor}
    onLongPress={onLongPress}
    style={styles.button}
  >
    <View style={[styles.container]}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  </Touch>
);

export default RideListItem;
