import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import moment from 'moment';
// import Badge from '../../Badge';
import Block from '../../Block';
import styles from './styles';
import {EditButton , DeleteButton} from '../../Button';
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
      {/* <TouchableOpacity onPress={onPress}> */}
        {/* <Block row space="between" style={{ marginBottom: 16 }}> */}
          <Text style={styles.date}>{year}</Text>
          {/* <Text style={styles.date}>{moment(date).format('MMM D')}</Text>
          <Text style={styles.date}>{moment(date).format('h:mm A')}</Text> */}
          {/*//? <Text styles={styles.name}>{name}</Text>
                                                          */}
        {/* </Block> */}
        {/* <Block row center> */}
          {/* <Badge color="rgba(30,170,112,0.2)" size={14} style={{ marginRight: 8 }}> */}
            {/* <Badge color="#1EAA70" size={8} /> */}
          {/* </Badge> */}
          <Text style={styles.location}>{make}</Text>
        {/* </Block> */}
        {/* <Block row center style={{ paddingVertical: 4 }}> */}
          {/* <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} /> */}
        {/* </Block> */}
        {/* <Block row center>
          <Badge
            color="rgba(255, 71, 87, 0.2)"
            size={14}
            style={{ marginRight: 8 }}>
            <Badge color="#FF4957" size={8} />
          </Badge> */}
          <Text spacing={0.5} style={styles.location}> {model}</Text>
        {/* </Block> */}
      {/* </TouchableOpacity> */}
      <Block row center style={{marginTop: 16, marginLeft: 16, justifyContent: 'space-between'}}>
        <EditButton title={'Edit'} onPress={onPress} vehicleId={vehicleId} token={token}/> 
        <DeleteButton title={'Delete'} deleteVehicle={deleteVehicle} vehicleId={vehicleId} token={token}/>
      </Block> 
    </View>
  );
//? Card.propTypes = {
//?  onPress: PropTypes.func,
//? };

export default VehicleCard;
