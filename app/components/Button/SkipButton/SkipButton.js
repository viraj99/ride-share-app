import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
// import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const SkipButton = ({ title, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#678595', '#57717e', '#475c67']}
    style={styles.linearGradient}
  >
    <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <Icon
            name="skip-forward"
            size={30}
            color="#475c67"
            // reverse
            // raised
            type="material-community"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </View>
  </LinearGradient>
);

// SkipButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default SkipButton;
