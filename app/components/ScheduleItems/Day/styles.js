import { Platform, StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 8,
    marginHorizontal: 10,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  textContainer: {
    marginLeft: -2,
  },
  emptyText: {
    color: '#808080',
  },
});
