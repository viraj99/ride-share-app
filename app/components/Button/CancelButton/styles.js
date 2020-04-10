// Start Button styles
import { Platform, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
// #e56353 start base
// #ff6272 final choice will be this pink use for resume change of state

export default StyleSheet.create({
  linearGradient: {
    borderRadius: 30,
    marginHorizontal: 10,
    height: 50,
    width: width / 3,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  circleButtonContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    paddingBottom: 10
  },
  buttonWrapper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignContent: 'center'
    // paddingBottom: 10
  },
  buttonText: {
    paddingLeft: 18,
    color: '#fff',
    fontWeight: '600',
    fontSize: 22
    // paddingBottom: 10
  },
  startTextContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
    // paddingBottom: 10
  }
});
