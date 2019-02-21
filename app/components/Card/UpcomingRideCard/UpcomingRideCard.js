import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { StartButton } from '../../Button';
// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({ onPress }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.date}>TODAY, FEB 14</Text>
    <View style={styles.seperator} />
    <View style={styles.aligner}>
      <View style={styles.locationWrapper}>
        <Icon color="#b1c1c8" name="location" size={25} />
        <Text style={styles.locationText}>Durham — NC</Text>
      </View>
      <Text style={styles.time}>10:00 AM</Text>
      <StartButton onPress={onPress} />
    </View>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
