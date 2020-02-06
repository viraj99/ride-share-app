import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Icon color="#ff8262" name="pencil" size={25} />
    </TouchableOpacity>
  </View>
);

export default EditButton;
