import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { EditButton, DeleteButton } from '../../Button';
const VehicleCard = ({
  onPress,
  deleteVehicle,
  token,
  year,
  make,
  model,
  vehicleId
}) => (
  <View style={styles.cardContainer}>
    <EditButton
      style={[{ justifyContent: 'flex-start' }]}
      title={'Edit'}
      onPress={onPress}
      vehicleId={vehicleId}
      token={token}
    />
    <Text style={styles.flatListText}>{make}</Text>
    <Text style={styles.flatListText}> {model}</Text>
    <Text style={styles.flatListText}>{year}</Text>
    <DeleteButton
      style={[{ paddingRight: 15 }]}
      title={'Delete'}
      deleteVehicle={deleteVehicle}
      vehicleId={vehicleId}
      token={token}
    />
  </View>
);
export default VehicleCard;
