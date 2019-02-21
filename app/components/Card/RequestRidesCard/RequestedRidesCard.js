import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({ onPress, name }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>Feb 18 — 10:00 AM</Text>
        <Text style={styles.location}>Durham — Raleigh</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
