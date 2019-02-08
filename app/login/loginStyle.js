import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    padding: 50,
  },
  titleContainer: {
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  image: {
    padding: 20,
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    paddingBottom: 5,
  },
  sectionContainer: {
    justifyContent: 'space-evenly',
    padding: 5,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 6,
    fontSize: 15,
    width: 200,
  },
  default: {
    textAlign: 'left',
  },
  submitButton: {
    borderWidth: 0.5,
    height: 35,
    borderRadius: 6,
  },
  submitButtonText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
});
