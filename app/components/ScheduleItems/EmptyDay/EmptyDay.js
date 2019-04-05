import React from 'react';
import {
  Text, View,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

const EmptyDay = ({ date }) => (
  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateNumber}>{moment(date, 'X').format('DD')}</Text>
      <Text style={styles.dateAbbrev}>{moment(date, 'X').format('MMM')}</Text>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.emptyDisplay}>You have nothing scheduled for this day yet</Text>
    </View>
  </View>
);

export default EmptyDay;
