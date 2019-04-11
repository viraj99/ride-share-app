import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 9,
  },
  dateAbbrev: {
    color: '#808080',
    fontSize: 16,
  },
  dateNumber: {
    marginTop: 3,
    fontSize: 20,
    color: 'black',
  },
});
