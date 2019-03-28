import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  button: {
    height: 54,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    color: '#0C0D0F',
    marginTop: Platform.OS === 'ios' ? 6 : 3,
    marginBottom: 1,
    textAlign: 'left',
  },
  date: {
    fontSize: 14,
    color: '#9EA2A8',
  },
});
