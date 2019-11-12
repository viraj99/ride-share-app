import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const RegisterHeader = ({onPress, backgroundColor, iconColor}) => (
  <View
    style={[styles.headerContainer, {backgroundColor: `${backgroundColor}`}]}>
    <View style={styles.leftContainer}>
      <TouchableOpacity onPress={onPress}>
        <Icon color={`${iconColor}`} name="close" size={32} />
      </TouchableOpacity>
    </View>
    <View style={styles.rightContainer} />
  </View>
);

export default RegisterHeader;
