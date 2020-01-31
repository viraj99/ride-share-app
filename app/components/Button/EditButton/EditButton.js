import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import PropTypes from 'prop-types';
//import Delete from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const EditButton = ({ title, onPress, editVehicle, vehicleId, token }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      {/* <View style={styles.circleButtonContainer}> */}

      <Icon
        color="#ff8262"
        name="pencil"
        size={25}
        // style={{ alignSelf:  }}
      />
      {/* </View> */}
    </TouchableOpacity>
  </View>
);

// EditButton.propTypes = {
//   text: PropTypes.string,
//   onPress: PropTypes.func,
// };

export default EditButton;
