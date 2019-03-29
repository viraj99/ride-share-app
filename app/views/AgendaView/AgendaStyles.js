import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: height / 17,
    right: width / 10,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

});
