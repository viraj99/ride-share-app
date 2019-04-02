import { StyleSheet, Platform, Dimensions } from 'react-native';
import variables from '../../utils/variables';

const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  button: {},
  container: {
    flexDirection: 'row',
    // marginHorizontal: 16,
    alignSelf: 'center',
    width: width - 40,
    marginVertical: 15,

    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  dateContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  verticalSepartor: {
    borderRightWidth: 1,
    borderRightColor: '#CBCED1',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 13,
    color: '#b1c1c8',
    marginBottom: Platform.OS === 'ios' ? 10 : 5,
    textAlign: 'left',
  },
  date: {
    fontSize: 22,
    color: '#475c67',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  time: {
    fontSize: 18,
    color: '#475c67',
    marginTop: Platform.OS === 'ios' ? 10 : 5,
    fontFamily: variables.fontFamily,
  },
  address: {
    fontSize: 13,
    color: '#0C0D0F',
    fontWeight: '400',
  },
  location: {
    fontSize: 13,
    color: '#0C0D0F',
    fontWeight: '400',
  },
  dashedSeparator: {
    borderColor: '#CBCED1',
    // borderRadius: 5,
    borderWidth: 0.4,
    borderStyle: 'dashed',
    marginVertical: 5,
    marginRight: 20,
    justifyContent: 'space-around',
  },
});
