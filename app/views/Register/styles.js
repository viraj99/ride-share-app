import { StyleSheet, Platform } from 'react-native';
import variables from '../../utils/variables';
import { getStatusBarHeight, getBottomSpace } from '../../components/Header/StatusBar';

export default StyleSheet.create({
  signup: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67',
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 22,
    paddingTop: 20,
  },
  headerPadding: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 50 : 50,
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
  },
  scrollContainer: {
    paddingTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  input: {
    marginHorizontal: 16,
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: variables.sizes.font,
    fontWeight: '500',
    color: variables.colors.black,
    height: variables.sizes.base * 3,
  },
  text: {
    paddingHorizontal: 16,
    fontSize: variables.sizes.font,
    fontWeight: '500',
    color: '#2F2F2F',
    paddingTop: 10,
  },
  hasErrors: {
    borderBottomColor: variables.colors.accent,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
  },
});
