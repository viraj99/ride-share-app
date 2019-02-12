import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

// import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({ onPress }) => (
  <View style={styles.headerContainer}>
    <View style={styles.leftContainer}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '600' }}>RIDE SHARE APP</Text>
    </View>
    <View style={styles.rightContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon color="white" name="gear" size={30} />
      </TouchableOpacity>
    </View>
  </View>
);

// Header.propTypes = {
//   onPress: PropTypes.func,
// };

export default Header;
