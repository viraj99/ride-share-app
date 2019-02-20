import { Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from './StatusBar';

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1EAA70',
    borderBottomColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: (Platform.OS === 'ios' ? 80 : 56) + getStatusBarHeight(),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  titleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
});
