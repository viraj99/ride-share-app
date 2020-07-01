import {Platform, StyleSheet, Dimensions} from 'react-native';
import variables from '../../../utils/variables';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  cardContainer: {
    borderRadius: variables.sizes.border,
    backgroundColor: variables.cardDefaultBg,
    width: width - variables.sizes.padding * 2,
    marginHorizontal: variables.sizes.margin,
    paddingHorizontal: variables.sizes.padding,
    paddingVertical: variables.sizes.padding * 0.66,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 13,
    elevation: Platform.OS === 'ios' ? 0 : 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2F2F2F',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 28,
  },
  distance:{
      color: '#475c67',
  },
  location: {
    color: '#2F2F2F',
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
  },
  noteContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',


  },
});
