import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingBottom: Platform.OS == 'ios' ? 100 : 0
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#475c67',
    textAlign: 'center'
  },
  image: {
    padding: 10
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: '#fff'
  },
  formTitleContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#475c67'
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#475c67'
  },
  errorContainer: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#fff',
    padding: 6,
    alignItems: 'center'
  },
  errorMessage: {
    color: '#e56353',
    fontSize: 14,
    fontWeight: 'bold'
  },
  inputContainer: {
    padding: 5
  },
  sectionContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#475c67',
    borderWidth: 1,
    borderRadius: 5
  },
  icon: {
    paddingLeft: 10,
    paddingTop: 10
  },
  textInput: {
    textAlign: 'left',
    padding: 10,
    fontSize: 15,
    color: '#000000',
    width: 200
  },
  default: {
    textAlign: 'left',
    color: '#ffffff'
  },
  buttonContainer: {
    paddingTop: 10
  },
  submitContainer: {
    backgroundColor: '#475c67',
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: '#475c67',
    alignItems: 'center'
  },
  submitButton: {
    height: 40,
    padding: 5
  },
  submitButtonText: {
    fontSize: 15,
    textAlign: 'center',
    width: 200,
    padding: 5,
    color: '#ffffff'
  },
  forgotPasswordLink: {
    color: '#e56353',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
