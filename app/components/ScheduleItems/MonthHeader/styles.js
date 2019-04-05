import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gray',
    height: 100,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    position: 'relative',
    top: 20,
    left: 20,
  },
});
