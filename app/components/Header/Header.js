import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({ onPress }) => (
  <View style={styles.headerContainer}>
    <View style={styles.leftContainer}>
      <Text style={styles.titleText}>Title or name</Text>
    </View>
    <View style={styles.rightContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon color="white" name="settings" size={30} />
      </TouchableOpacity>
    </View>
  </View>
);

// Header.propTypes = {
//   onPress: PropTypes.func,
// };

export default Header;
