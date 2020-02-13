import { Dimensions, Platform, StatusBar } from 'react-native';

// Borrowed from https://github.com/ptelad/react-native-iphone-x-helper
// when finished merging add to config file
function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 || dimen.width === 896)
  );
}

function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(skipAndroid = false) {
  if (Platform.OS === 'ios') {
    return ifIphoneX(44, 20);
  }

  if (skipAndroid) {
    return 0;
  }

  return StatusBar.currentHeight;
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
