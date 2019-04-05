import { Platform, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  dayContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
  },
  timeContainer: {
    flex: 1,
    backgroundColor: '#1EAA70',
    justifyContent: 'center',
  },
  eventContainer: {
    flex: 5,
    backgroundColor: '#fcfcf6',
    flexDirection: 'column',
  },
});
