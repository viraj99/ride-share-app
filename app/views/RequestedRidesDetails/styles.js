import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcf6',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#475c67',
    alignSelf: 'center',
    lineHeight: 28,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 10 : 10,
  },
  startRideButton: {
    backgroundColor: '#ff8262',
    borderRadius: (width - 40) / 2,
    width: width - 90,
    paddingVertical: 15,
  },
  startRideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRideTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#475c67',
    borderRadius: 40,
    width: width - 100,
  },
  cardContainer: {
    flex: 3,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
