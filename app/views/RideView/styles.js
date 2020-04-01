import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcf6'
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: '#475c67'
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475c67'
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 10 : 10
  },
  startRideButton: {
    backgroundColor: '#ff8262',
    borderRadius: (width - 40) / 2,
    width: width - 90,
    paddingVertical: 15
  },
  phoneButton: {
    backgroundColor: '#1eaa70',
    borderRadius: (width - 40) / 2,
    width: width - 90,
    paddingVertical: 15
  },
  startRideContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  startRideTitle: {
    fontSize: 22,
    fontWeight: '600'
    // backgroundColor: 'black'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerContainer: {
    backgroundColor: '#475c67',
    paddingLeft: 45,
    marginRight: 18,
    marginBottom: 10,
    borderRadius: (width - 40) / 2,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderWidth: 1,
    borderColor: '#475c67'
  },
  timerText: {
    fontSize: 35,
    color: '#fcfcf6'
  },
  textMask: {
    color: '#fcfcf6',
    fontSize: 22,
    fontWeight: '600'
  },
  phoneStyle: {
    borderRadius: (width - 40) / 2,
    backgroundColor: '#1EAA70',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 90
  }
});
