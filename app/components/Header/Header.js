import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({ onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={
      Platform.OS === 'ios'
        ? ['#3a556a', '#3a556a', '#3a556a']
        : ['#3a556a', '#3a556a']
    }
    style={styles.welcomeContainer}
  >
    <Text style={styles.welcomeText}>Welcome</Text>
  </LinearGradient>
);

// Header.propTypes = {
//   onPress: PropTypes.func,
// };

export default Header;
