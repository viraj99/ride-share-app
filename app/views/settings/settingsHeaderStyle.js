import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAA70',
    height: 125,
    marginTop: Platform.OS == 'ios' ? 0 : 30,
  },
  componentsContainer: {
    paddingTop: 55,
    flexDirection: 'row',
    flex: 1,
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 120,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
  },
});
