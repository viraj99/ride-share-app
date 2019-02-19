import { Platform, StyleSheet, Dimensions } from 'react-native';
import variables from '../../../utils/variables';

const { height, width } = Dimensions.get('window');

export default (styles = StyleSheet.create({
  cardContainer: {
    width: width - 40,
    marginLeft: 20,
    marginVertical: 15,
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
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 16,
    color: '#475c67',
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
  },
  location: {
    color: '#b1c1c8',
    fontWeight: '600',
  },
}));
