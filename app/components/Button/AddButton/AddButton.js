import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
//import Delete from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const AddButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View style={{ flexDirection: 'row' }}>
    <Icon color="#ffffff" name="car-multiple" size={25} />
    <TouchableOpacity onPress={onPress}>
      {/* <View style={styles.circleButtonContainer}>
       */}
      <Icon
        color="#ffffff"
        // padding="5"
        // name="car-multiple"
        name="plus-circle"
        // borderRadius="5"
        size={25}
        // style={{ alignSelf: 'flex-end' }}
      />
      {/* </View> */}
    </TouchableOpacity>
  </View>
);

// AddButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default AddButton;
