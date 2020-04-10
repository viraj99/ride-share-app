import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteButton = ({ title, deleteVehicle, vehicleId, token }) => (
  <View>
    <TouchableOpacity onPress={() => deleteVehicle(vehicleId, token)}>
      <Icon color="#e56353" name="delete" size={25} />
    </TouchableOpacity>
  </View>
);

export default DeleteButton;
