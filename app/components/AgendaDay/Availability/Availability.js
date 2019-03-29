import React from 'react';
import {
  View, Text,
} from 'react-native';
// import PropTypes from 'prop-types';
import styles from './styles';


const Availability = ({
  initTime, endTime, location, date,
}) => (
  <View style={styles.dayContainer}>
    <View style={styles.timeContainer}>
      <Text>{initTime}</Text>
      <Text>{endTime}</Text>
    </View>
    <View style={styles.eventContainer}>
      <Text>{`Location: ${location}`}</Text>
      <Text>{`Date: ${date}`}</Text>
    </View>
  </View>
);

export default Availability;
