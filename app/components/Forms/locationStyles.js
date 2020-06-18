import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 10,
  },
  sectionHeader: {
    padding: 5,
    backgroundColor: '#ff8262',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  sectionHeaderText: { padding: 5, fontSize: 20, color: '#ffffff' },
  inputLabel: {
    color: '#475c67',
    fontWeight: '700',
    marginHorizontal: 16,
    paddingTop: 10,
    marginTop: 3,
    fontSize: 20,
  },
  inputStyle: {
    marginHorizontal: 16,
    fontSize: 18,
    paddingLeft: 30,
    color: 'black',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  onInputStyle: {
    marginHorizontal: 16,
    fontSize: 18,
    paddingLeft: 30,
    color: 'black',
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  defaultLocationContainer: { flexDirection: 'row', paddingTop: 10 },
  toggleContainer: {
    position: 'absolute',
    right: 0,
    paddingTop: 20,
    paddingRight: 15,
  },
  buttonContainer: { padding: 10 },
  errorMessage: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 18,
    color: '#D8000C',
  },
});
