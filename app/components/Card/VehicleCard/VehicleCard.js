import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { EditButton, DeleteButton } from '../../Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const VehicleCard = ({
  onPress,
  deleteVehicle,
  token,
  year,
  make,
  model,
  vehicleId,
}) => (
  <View
    style={{
      padding: 5,
      paddingLeft: 10,
      paddingTop: 10,
      flex: 1,
      flexDirection: 'row',
    }}
  >
    <Text style={{ fontSize: 16, color: '#475c67' }}>{make}</Text>
    <Text style={{ fontSize: 16, color: '#475c67' }}> {model}</Text>
    <Text style={{ fontSize: 16, color: '#475c67' }}> {year}</Text>

    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        paddingTop: 5,
      }}
    >
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity onPress={() => onPress()}>
          <Icon color="#ff8262" name="pencil" size={25}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TouchableOpacity onPress={() => deleteVehicle(vehicleId)}>
          <Icon color="#ff8262" name="delete" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default VehicleCard;
