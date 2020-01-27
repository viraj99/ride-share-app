import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
//import Delete from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const DeleteButton = ({ title, deleteVehicle, vehicleId, token }) => (
  <View>
    <TouchableOpacity onPress={() => deleteVehicle(vehicleId, token)}>
      {/* <View style={styles.circleButtonContainer}> */}
      <Icon
        color="#ff8262"
        name="delete"
        size={25}
        // style={{ alignSelf: 'flex-start' }}
      />
      {/* </View> */}
    </TouchableOpacity>
  </View>
);

export default DeleteButton;
