import React from 'react';
import {
  TouchableOpacity, View, Text, Image,
} from 'react-native';
// import PropTypes from 'prop-types';

import styles from './styles';

const CalendarButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

// CalendarButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default CalendarButton;
