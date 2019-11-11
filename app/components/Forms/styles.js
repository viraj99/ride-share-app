import { StyleSheet, Platform } from 'react-native';
import variables from '../../utils/variables';
import { getBottomSpace } from '../Header/StatusBar';

export default StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67',
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 22,
  },
  labelStyle: {
    color: '#2F2F2F',
    fontWeight: '500',
  },
  saeInput: {
    marginHorizontal: 16,
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  saeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colors.black,
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
  },
});
