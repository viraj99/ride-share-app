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
  emptyText: {
    color: '#808080',
  },
});
