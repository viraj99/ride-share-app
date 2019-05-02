import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475c67',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingBottom: Platform.OS == 'ios' ? 100 : 0,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
  },
  image: {
    padding: 20,
  },
  formContainer: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#ff8262',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffffff',
  },
  errorContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  errorMessage: {
    color: '#ff8262',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
  },
  textInput: {
    textAlign: 'left',
    padding: 10,
    borderWidth: 0.3,
    fontSize: 15,
    color: '#000000',
  },
  default: {
    textAlign: 'left',
    color: '#ffffff',
  },
  buttonContainer: {
    paddingTop: 10,
  },
  submitContainer: {
    backgroundColor: '#ff8262',
  },
  submitButton: {
    borderWidth: 0.3,
    height: 35,
    padding: 5,
  },
  submitButtonText: {
    fontSize: 15,
    textAlign: 'center',
    width: 200,
    padding: 5,
    color: '#ffffff',
  },
  signUpButton: {
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
  },
  signUpButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
  },
});
