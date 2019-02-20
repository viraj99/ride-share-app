import React from 'react';
import {
  TouchableOpacity, View, Text, Image,
} from 'react-native';
// import PropTypes from 'prop-types';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

import styles from './styles';

const StartButton = ({ title, onPress }) => (
  <View style={styles.buttonContainer}>
    <View style={styles.buttonWrapper}>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>Start</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <ArrowIcon color="#ff8262" name="arrowright" size={20} style={{ alignSelf: 'center' }} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

// StartButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default StartButton;
