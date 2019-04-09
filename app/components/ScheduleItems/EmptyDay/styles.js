import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    // margin: 10,
    // padding: 10,
    justifyContent: 'space-between',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 12,

  },
  contentContainer: {
    flex: 8,
    marginHorizontal: 10,
    marginTop: 1.5,
    padding: 5,
    // justifyContent: 'center',
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
  },
  dateAbbrev: {
    color: '#808080',
    fontSize: 16,
  },
  dateNumber: {
    marginTop: 3,
    fontSize: 20,
  },
  emptyText: {
    color: '#808080',
  },
});
