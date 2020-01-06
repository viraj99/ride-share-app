import {StyleSheet, Dimensions, Platform} from 'react-native';
import variables from '../../utils/variables';
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
    width: width - variables.sizes.padding * 2,
    marginHorizontal: variables.sizes.margin,
    marginVertical: 20,
    marginBottom: variables.sizes.base,
    paddingHorizontal: 10,
    paddingVertical: variables.sizes.padding * 0.66,
    borderRadius: variables.sizes.border,
    backgroundColor: variables.cardDefaultBg,
    shadowColor: '#000',
    shadowOpacity: 0.11,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 13,
    elevation: Platform.OS === 'ios' ? 0 : 5,
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flatListText: {
    fontSize: 18,
    paddingLeft: 5,
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
  leftList: {
     marginRight: 10,
     marginTop: 5,
  },
  centerList: {
    flex: 3,
    justifyContent: 'space-between'
  },
  rightList: {
    marginTop: 5,
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
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EAA70',
    height: Platform.OS == 'ios' ? 120 : 80,
    marginTop: Platform.OS == 'android' ? 0 : 0,
  },
  componentsContainer: {
    paddingTop: Platform.OS == 'ios' ? 55 : 0,
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
  noAvailText: {
    fontSize: 18,
    paddingHorizontal: 25,
    paddingTop: 10,
  }
});