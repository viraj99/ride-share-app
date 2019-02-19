import { Platform, StyleSheet } from 'react-native';
import variables from './variables';

export default (styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
    borderWidth: variables.borderWidth,
    borderRadius: variables.cardBorderRadius,
    borderColor: variables.cardBorderColor,
    flexWrap: 'nowrap',
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
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
}));
