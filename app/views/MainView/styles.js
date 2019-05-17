import { Platform, StyleSheet } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';
import variables from '../../utils/variables';

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
    fontWeight: '600',
    color: '#475c67',
  },
  seperator: {
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 3,
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
  titleWrapper: {
    marginTop: 15,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
    flex: 2,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: variables.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: variables.colors.darkgray,
  },
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 5,
  },
});
