import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  overviewContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#475c67',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  locationText: {
    fontSize: 22,
    color: '#fff',
  },
});
