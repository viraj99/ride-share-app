import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    margin: 10,
  },
  dateContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 8,
    alignItems: 'center',
    marginRight: 20,
  },
});
