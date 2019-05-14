import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcf6',
  },
  settingSection: {
    padding: 10,
    borderColor: '#b1c1c8',
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: '#fcfcf6',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#d3d3d3',
    shadowOpacity: 0.5,
  },
  section: {
    padding: 5,
    justifyContent: 'space-around',
  },
  sectionTitleContainer: {
    padding: 5,
    backgroundColor: '#ff8262',
    borderRadius: 5,
  },
  sectionTitle: {
    padding: 5,
    fontSize: 20,
    color: '#ffffff',
  },
  inputContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputTitle: {
    padding: 5,
    fontSize: 20,
    color: '#475c67',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#475c67',
    paddingLeft: 5,
  },
  switchStyle: {
    paddingTop: 15,
  },
  input: {
    fontSize: 20,
    color: '#475c67',
  },
  userFirstLastName: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radiusTitle: {
    fontSize: 13,
    color: '#475c67',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ff8262',
  },
  buttonSection: {
    padding: 5,
    alignItems: 'flex-end',
  },
  editButton: {
    padding: 5,
    backgroundColor: '#ff8262',
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
  },
  logoutButton: {
    padding: 5,
    backgroundColor: '#475c67',
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    color: '#ffffff',
  },
});
