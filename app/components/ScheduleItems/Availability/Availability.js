import React from 'react';
import {
  View, Text,
} from 'react-native';
// import PropTypes from 'prop-types';
import moment from 'moment';
import { DateDisplay } from '../index';
import styles from './styles';


const Availability = ({
  initTime, endTime, location, date, reoccurring,
}) => (
  <View style={styles.container}>
      <DateDisplay
        date={date}
      />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{`${moment(initTime, 'X').format('h:mm a')} - ${moment(endTime, 'X').format('h:mm a')}`}</Text>
          <Text style={styles.text}>{location}</Text>
          <Text style={styles.text}>{reoccurring}</Text>
        </View>
      </View>
    </View>
);

export default Availability;
