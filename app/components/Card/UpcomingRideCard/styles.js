import { Platform, StyleSheet, Dimensions } from 'react-native';
import variables from '../../../utils/variables';

const { height, width } = Dimensions.get('window');

export default (styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: width - 40,
    marginLeft: 20,
    marginVertical: 20,
    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  wrapper: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    color: '#475c67',
  },
  date: {
    color: '#475c67',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    paddingTop: 10,
  },
  locationText: {
    fontSize: 18,
    color: '#b1c1c8',
    fontWeight: '600',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },

  aligner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  seperator: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
}));
