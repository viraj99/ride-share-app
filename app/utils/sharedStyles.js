import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,.2)',
    left: 0,
    top: 0,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CBCED1',
  },
  separatorTop: {
    borderColor: '#CBCED1',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  separatorBottom: {
    borderColor: '#CBCED1',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorVertical: {
    borderColor: '#CBCED1',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  textRegular: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
    }),
  },
  textMedium: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
    }),
  },
  textSemibold: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
  textBold: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      android: {
        includeFontPadding: false,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
});
