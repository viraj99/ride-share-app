import React from 'react';
import {
  Text, View,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

const EmptyDay = ({ date }) => (

  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateAbbrev}>{moment(date, 'X').format('ddd')}</Text>
      <Text style={styles.dateNumber}>{moment(date, 'X').format('D')}</Text>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.emptyText}>Nothing scheduled yet. Tap to add availability.</Text>
    </View>
  </View>
);

export default EmptyDay;
