import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    backgroundColor: '#e56353',
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
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
