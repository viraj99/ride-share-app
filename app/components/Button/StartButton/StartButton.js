import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const StartButton = ({ title, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#EFA198', '#EA8275', '#e56353']}
    style={styles.linearGradient}
  >
    <View style={styles.buttonWrapper}>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <ArrowIcon
            color="#e56353"
            name="arrowright"
            size={20}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

// StartButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default StartButton;
