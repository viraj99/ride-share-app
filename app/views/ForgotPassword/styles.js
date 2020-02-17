import { StyleSheet } from 'react-native';
// import variables from '../../utils/variables';
// import { getStatusBarHeight, getBottomSpace } from '../../components/Header/StatusBar';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#475c67',
    textAlign: 'center'
  },
  subTitle: {
    color: '#2F2F2F',
    fontSize: 16
  },
  buttonTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  input: {
    borderBottomColor: '#2F2F2F',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 14,
    fontWeight: '500',
    color: '#2F2F2F',
    height: 16 * 3
  },
  inputContainer: {
    paddingTop: 5
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
  }
});
