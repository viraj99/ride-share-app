import React from 'react';
import {
  Text, View,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

const WeekHeader = ({ start, end }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>
      {moment(start).format('MMM D')}
      {' '}
      -
      {' '}
      {moment(end, 'X').format('MMM D')}
    </Text>
  </View>
);

export default WeekHeader;
