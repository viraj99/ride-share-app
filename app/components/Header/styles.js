import { Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from './StatusBar';

// potential greens
// #3cc5a2
// #00b270
// #3da676
// #00b576

export default (styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#00b576',
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
