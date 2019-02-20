import { Platform, StyleSheet } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcf6',
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 15 : 0,
    backgroundColor: '#fcfcf6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475c67',
  },
  seperator: {
    borderWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  seeAllText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#ff8262',
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  regText: {
    fontSize: 16,
    fontWeight: '500',
  },
  titleWrapper: {
    marginTop: 15,
    marginHorizontal: 16,
  },
  viewMoreContainer: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
