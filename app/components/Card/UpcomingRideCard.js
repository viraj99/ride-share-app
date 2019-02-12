import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

// import PropTypes from 'prop-types';
import styles from './styles';

const UpcomingRideCard = ({ onPress }) => (
  <View style={styles.cardContainer}>
    <View style={styles.wrapper}>
      <Text>TODAY, FEB 1 </Text>
      <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />
      <Text>lOCATION</Text>
      <Text>TIME</Text>
      <Text>START</Text>
      <Text>CARD BUTTON</Text>
    </View>
  </View>
);

// Card.propTypes = {
//   onPress: PropTypes.func,
// };

export default UpcomingRideCard;
