import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import moment from 'moment';
// import Badge from '../../Badge';
import Block from '../../Block';
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
    {/* <View style={styles.bottomBorder}> */}
    <Text style={styles.flatListText}>{make}</Text>
    {/* </View> */}
    {/* <View style={styles.bottomBorder}> */}
    <Text style={styles.flatListText}> {model}</Text>
    {/* </View> */}
    {/* <View style={styles.bottomBorder}> */}
    <Text style={styles.flatListText}>{year}</Text>
    {/* </View> */}

    <DeleteButton
      style={[{ paddingRight: 15 }]}
      title={'Delete'}
      deleteVehicle={deleteVehicle}
      vehicleId={vehicleId}
      token={token}
    />
  </View>
);
//? Card.propTypes = {
//?  onPress: PropTypes.func,
//? };

export default VehicleCard;
