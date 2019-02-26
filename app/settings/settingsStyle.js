import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fcfcf6',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#1EAA70',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
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
  input: {
    fontSize: 20,
    color: '#475c67',
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
