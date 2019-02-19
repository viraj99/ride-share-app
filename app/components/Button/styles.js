// Button styles
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#475c67',
    borderWidth: 2,
    borderColor: '#475c67',
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  wrapper: {
    // mainly used in calendar btn
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  icon: {
    width: 19,
    marginRight: 11,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 10,
  },
});
