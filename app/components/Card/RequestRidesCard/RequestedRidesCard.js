import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({
  onPress, name, date, pickupLocation, dropoffLocation,
}) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{moment(date).format('MMM Do – h:mm A')}</Text>
        <Text style={styles.location}>
          {pickupLocation}
          {' → '}
          {dropoffLocation}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
