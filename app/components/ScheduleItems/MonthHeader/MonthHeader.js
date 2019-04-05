import React from 'react';
import {
  Text, View,
} from 'react-native';
import styles from './styles';

const MonthHeader = ({ month }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>{month}</Text>
  </View>
);

export default MonthHeader;
