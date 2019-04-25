import React from 'react';
import {
  Text, View,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

const DateDisplay = ({ date }) => (
  <View style={styles.dateContainer}>
    <Text style={styles.dateAbbrev}>{moment(date, 'X').format('ddd')}</Text>
    <Text style={styles.dateNumber}>{moment(date, 'X').format('D')}</Text>
  </View>
);

export default DateDisplay;
