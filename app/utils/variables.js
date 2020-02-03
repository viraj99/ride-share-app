import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === 'ios' &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

const sizes = {
  base: 16,
  font: 14,
  padding: 36,
  margin: 36,
  title: 24,
  border: 16,
  radius: 12
};

const colors = {
  primary: '#3a556a',
  secondary: '#ff8262',
  tertiary: '#fcfcf6',
  active: '#FF4957',
  black: '#2F2F2F',
  white: '#FFFFFF',
  gray: '#BDBFC7',
  gray2: '#D8D8D8',
  gray3: '#F0F0F0',
  gray4: '#F7F8FA',
  darkgray: '#475c67',
  lightgray: '#b1c1c8'
};

export default {
  platformStyle,
  platform,
  sizes,
  colors,

  // Card
  cardDefaultBg: '#fff',
  cardBorderColor: '#ccc',
  cardBorderRadius: 5,
  cardItemPadding: platform === 'ios' ? 10 : 12,

  // Color
  brandPrimary: platform === 'ios' ? '#007aff' : '#3F51B5',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandDark: '#000',
  brandLight: '#f4f4f4',

  // Container
  containerBgColor: '#fff',

  // Date Picker
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // Font
  DefaultFontSize: 16,
  fontFamily: platform === 'ios' ? 'System' : 'Roboto',
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: platform === 'ios' ? 20 : 24,
  listItemSelected: platform === 'ios' ? '#007aff' : '#3F51B5',

  // List
  listBg: 'transparent',
  listBorderColor: '#c9c9c9',
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  listItemPadding: platform === 'ios' ? 10 : 12,
  listNoteColor: '#808080',
  listNoteSize: 13,

  // Text
  textColor: '#000',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: platform === 'ios' ? 'System' : 'Roboto_medium',
  titleFontSize: platform === 'ios' ? 17 : 19,
  subTitleFontSize: platform === 'ios' ? 11 : 14,
  subtitleColor: platform === 'ios' ? '#8e8e93' : '#FFF',
  titleFontColor: platform === 'ios' ? '#000' : '#FFF',

  // Other
  borderRadiusBase: platform === 'ios' ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30
};
