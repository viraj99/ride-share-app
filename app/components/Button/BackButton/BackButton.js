import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Icon color="#e56353" name="ios-arrow-back" size={30} marginLeft={10} />
    </TouchableOpacity>
  </View>
);

export default BackButton;
