import {StyleSheet, Dimensions, Platform} from 'react-native';
// import {getBottomSpace} from '../Header/StatusBar';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67',
  },
  availListItem: {
    borderColor: 'gray',
    borderBottomWidth: 2,
    marginTop: 10,
    paddingBottom:10,
    marginLeft: 20,
    marginRight: 20,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatListText: {
    fontSize: 18,
  },
  leftContainer:{
    paddingTop: 10,
  },
  // footer: {
  //   marginTop: 20,
  //   paddingHorizontal: 32,
  //   paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
  // },
  addButton: {
    position: 'absolute',
    bottom: height / 17,
    right: width / 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flatlistContainer: {
    backgroundColor: '#fcfcf6',
  },
  formButton: {
    backgroundColor: '#ff8262',
  },
  inputRow: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#475c67',
    borderWidth: 2,
    borderColor: '#475c67',
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 4,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  buttonWrapper: {
    // mainly used in calendar btn
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 10,
  },
});
