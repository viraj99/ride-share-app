// Button styles
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    marginVertical: 10,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  icon: {
    width: 19,
    marginRight: 11,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    paddingVertical: 10,
  },
});
