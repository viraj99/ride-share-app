import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

import { StartButton } from '../../Button';
// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({
  onPress, date, location, name,
}) => (
  <View style={styles.cardContainer}>
    <Text style={styles.date}>{moment(date).format('MMMM Do')}</Text>
    <View style={styles.seperator} />
    <View style={styles.aligner}>
      <View style={styles.locationWrapper}>
        <Icon color="#b1c1c8" name="location" size={25} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <Text style={styles.time}>{moment(date).format('h:mm A')}</Text>
      <Text style={styles.time}>{name}</Text>
      <StartButton onPress={onPress} />
    </View>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
