import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: height / 17,
    right: width / 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flatlistContainer: {
    backgroundColor: '#fcfcf6',
  },
  formButton: {
    backgroundColor: '#ff8262',
  },
  inputRow: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },

});
