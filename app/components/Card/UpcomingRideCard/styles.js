import { Platform, StyleSheet, Dimensions } from 'react-native';
import variables from '../../../utils/variables';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    borderRadius: variables.sizes.border,
    marginBottom: variables.sizes.base,
    backgroundColor: variables.cardDefaultBg,
    width: width - variables.sizes.padding * 2,
    marginHorizontal: variables.sizes.margin,
    marginVertical: 20,
    paddingHorizontal: variables.sizes.padding,
    paddingVertical: variables.sizes.padding * 0.66
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 13,
    elevation: Platform.OS === 'ios' ? 0 : 5
  },
  text: {
    color: '#475c67'
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  location: {
    color: 'black',
    fontWeight: Platform.OS === 'ios' ? '500' : '400'
  },
  colon: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BDBFC7'
  },
  // horizontal line
  hLine: {
    marginVertical: 8 * 2,
    marginHorizontal: variables.sizes.base * 2,
    height: 1
  },
  // vertical line
  vLine: {
    marginVertical: variables.sizes.base / 2,
    width: 1
  }
});
