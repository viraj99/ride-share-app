import {StyleSheet} from 'react-native';
// import variables from '../../utils/variables';
// import { getStatusBarHeight, getBottomSpace } from '../../components/Header/StatusBar';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#475c67',
  },
  subTitle: {
    color: '#2F2F2F',
    fontSize: 16,
  },
  buttonTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 14,
    fontWeight: '500',
    color: '#2F2F2F',
    height: 16 * 3,
  },
  padding: {
    paddingTop: 10,
  },
});
