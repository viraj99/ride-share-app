import { StyleSheet, Platform } from 'react-native';
import variables from '../../utils/variables';
import { getBottomSpace } from '../Header/StatusBar';

export default StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67'
  },
  titleAvail: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67'
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 22
  },
  subTitleAvail: {
    fontWeight: '400',
    fontSize: 20
  },
  labelStyle: {
    color: '#2F2F2F',
    fontWeight: '500'
  },
  labelStyleAlt: {
    color: '#475c67',
    fontWeight: '700',
    marginHorizontal: 16,
    paddingTop: 10,
    marginTop: 3,
    fontSize: 20
  },
  labelStyleAvail: {
    color: '#475c67',
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 10,
    fontSize: 20
  },
  saeInput: {
    marginHorizontal: 16,
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  saeInputAlt: {
    marginHorizontal: 16,
    fontSize: 18,
    paddingLeft: 30,
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  saeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.colors.black
  },
  saeTextAlt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: variables.colors.black
  },
  displaySelection: {
    color: 'black',
    fontSize: 18,
    marginTop: 5,
    paddingBottom: 15,
    textAlign: 'center',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAA70',
    height: Platform.OS == 'ios' ? 120 : 80,
    marginTop: Platform.OS == 'android' ? 0 : 0
  },
  componentsContainer: {
    paddingTop: Platform.OS == 'ios' ? 55 : 0,
    flexDirection: 'row',
    flex: 3
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  headerTextContainer: {
    flex: 2
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff'
  }
});
