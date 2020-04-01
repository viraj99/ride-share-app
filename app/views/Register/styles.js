import { StyleSheet, Platform } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace
} from '../../components/Header/StatusBar';

export default StyleSheet.create({
  signup: {
    flex: 1
  },
  headerPadding: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 50 : 50,
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0
  }
});
