import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#475c67',
    textAlign: 'center'
  },
  image: {
    padding: 20
  },
  loginButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#475c67',
    borderWidth: 2,
    borderColor: '#475c67',
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 4
  },
  registerButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#e56353',
    borderWidth: 2,
    borderColor: '#e56353',
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 4
  },
  textWrapper: {
    // mainly used in calendar btn
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 100
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10
  }
  // testContainer: {
  //   // flex: 1,
  //   justifyContent: 'center',
  //   paddingHorizontal: 10
  // },
  // testButton: {
  //   alignItems: 'center',
  //   backgroundColor: '#DDDDDD',
  //   padding: 10
  // },
  // testText: {
  //   color: 'black'
  // }
});
