import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View style={{ flexDirection: 'row' }}>
    <Icon color="#ffffff" name="car-multiple" size={25} />
    <TouchableOpacity onPress={onPress}>
      <Icon color="#ffffff" name="plus-circle" size={25} />
    </TouchableOpacity>
  </View>
);

export default AddButton;
