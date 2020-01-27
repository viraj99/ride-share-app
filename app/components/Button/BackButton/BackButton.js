import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
//import Delete from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const BackButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View>
    {/* <Text style={styles.buttonText}>{title}</Text> */}
    <TouchableOpacity onPress={onPress}>
      {/* <View style={styles.circleButtonContainer}> */}

      <Icon color="#ff8262" name="ios-arrow-back" size={30} marginLeft={10} />
      {/* </View> */}
    </TouchableOpacity>
  </View>
);

// BackButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default BackButton;
