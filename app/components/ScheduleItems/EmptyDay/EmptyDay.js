import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import DateDisplay from '../DateDisplay/DateDisplay';
import styles from './styles';

const EmptyDay = ({ date, onPress }) => (

  <View style={styles.container}>
    <DateDisplay
      date={date}
    />
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>Nothing scheduled yet. Tap to add availability.</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default EmptyDay;
