import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  overviewContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  overviewLeftSection: {
    width: '15%',
    justifyContent: 'space-evenly',
  },
  overviewCenterSection: {
    width: '65%',
    justifyContent: 'center',
  },
  initialCenter: {
    width: '65%',
    justifyContent: 'space-evenly',
  },
  overviewRightSection: {
    width: '15%',
    justifyContent: 'space-around',
  },
  alignment: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#475c67',
  },
  locationText: {
    fontSize: 22,
    color: '#475c67',
  },
});
