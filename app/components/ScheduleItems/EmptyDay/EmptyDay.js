import React from 'react';
import {
  Text, View,
} from 'react-native';
import DateDisplay from '../DateDisplay/DateDisplay';
import styles from './styles';

const EmptyDay = ({ date }) => (

  <View style={styles.container}>
    <DateDisplay
      date={date}
    />
    <View style={styles.contentContainer}>
      <Text style={styles.emptyText}>Nothing scheduled yet. Tap to add availability.</Text>
    </View>
  </View>
);

export default EmptyDay;
