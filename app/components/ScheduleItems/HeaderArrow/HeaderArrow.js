import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderArrow = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="arrow-left" color="white" size={30} />
  </TouchableOpacity>
);

export default HeaderArrow;
