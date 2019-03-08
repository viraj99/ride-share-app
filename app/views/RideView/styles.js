import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcf6',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 10 : 0,
  },
  startButton: {
    backgroundColor: '#ff8262',
    borderRadius: 25,
    width: width - 40,
    paddingVertical: 15,
  },
  cancelButton: {
    backgroundColor: '#475c67',
    borderRadius: 25,
    width: width - 100,
  },
});
