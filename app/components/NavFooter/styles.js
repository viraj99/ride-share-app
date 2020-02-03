import { Platform, StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../Header/StatusBar';

export default StyleSheet.create({
  navFooterContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#b8dbd9',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    width: '100%'
  },
  navFooterItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '5%',
    marginHorizontal: '2%'
  },
  navFooterIcon: {
    textAlign: 'center'
  },
  navFooterText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#3a556a'
  }
});
