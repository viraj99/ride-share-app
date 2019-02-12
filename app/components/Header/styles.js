import { Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from './StatusBar';

export default (styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'pink',
    borderBottomColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: (Platform.OS === 'ios' ? 80 : 56) + getStatusBarHeight(),
  },
  centerContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
}));
