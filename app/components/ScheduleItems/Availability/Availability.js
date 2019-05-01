import React from 'react';
import {
  View, Text,
} from 'react-native';
// import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles';


const Availability = ({
  startTime, endTime, location, iterated,
}) => (
  <View style={iterated ? styles.adjustedContainer : styles.contentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${moment(startTime).format('h:mm a')} - ${moment(endTime).format('h:mm a')}`}</Text>
        <Text style={styles.text}>{location}</Text>
      </View>
    </View>
);

export default Availability;
