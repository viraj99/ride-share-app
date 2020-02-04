import {Platform, StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  textContainer: {
    marginLeft: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 8,
    height: 70,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#e56353',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  adjustedContainer: {
    flex: 8,
    height: 70,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#e56353',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});
