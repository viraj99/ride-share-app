import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({ onPress }) => (
  <View style={styles.cardContainer}>
    <Text>USER AVATAR</Text>
    <Text>DATE & TIME HERE</Text>
    <Text>lOCATION</Text>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
