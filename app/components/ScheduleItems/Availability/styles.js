import { Platform, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 20,
  },
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
    backgroundColor: '#ff8262',
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
});
