import {Platform, StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8ea0ad',
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
    marginBottom: 5,
    marginTop: 5,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    top: 20,
    left: 20,
  },
});
