import { Platform, StyleSheet } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';
import variables from '../../utils/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 15 : 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475c67'
  },
  seperator: {
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 3
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15
  },
  sectionHeader: {
    flex: 2
  },
  titleWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e56353'
  },
  upcomingHeader: {
    flex: 2,
    flexDirection: 'row'
  },
  upcomingSubTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff'
  },
  seeAllText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 110
  },
  viewMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
    flex: 2
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: variables.colors.gray,
    borderColor: 'transparent'
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: variables.colors.darkgray
  },
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 5
  },
  buttonBar: {
    alignItems: 'center',
    backgroundColor: '#475c67',
    borderWidth: 2,
    borderColor: '#475c67',
    borderRadius: 25,
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 4
  },
  buttonWrapper: {
    // mainly used in calendar btn
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50
  },
  showAllText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 50
  },
  hideAllText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 140
  },
  noSchedText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475c67',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 25,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: '#475c67'
  },
  noAvailText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475c67',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    marginBottom: 25,
    paddingVertical: 25,
    borderBottomWidth: 2,
    borderColor: '#475c67'
  },
  reqRidesContainer: {
    paddingBottom: 40
  }
});
