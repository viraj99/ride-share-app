import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getBottomSpace } from '../../components/Header/StatusBar';
import variables from '../../utils/variables';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fcfcf6',
  },
  userInfo:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: 'rgba(80, 69, 68, 0.28)',
    marginHorizontal: variables.sizes.margin,
    marginBottom: variables.sizes.margin * 0.5,
    paddingVertical: 9,
  },
  call: {
    backgroundColor: 'rgba(83, 194, 127, 0.56)',
    alignItems: 'center',
    width:  width*0.15,
    padding:5,
    borderRadius: (width - 40) / 2,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayNote: {
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
    flex: 1,
    justifyContent: 'center',
  },
  containerl: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  arrow:{
    display: "flex",
    alignItems:"flex-end",
    paddingLeft: width*0.05,
  },
  grow:{
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'rgba(80, 69, 68, 0.28)',
    position:'relative'
  },
  information:{
    flexWrap: 'wrap',
    marginLeft:6
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475c67'
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 10 : 10
  },
  riderNote:{
    backgroundColor: '#fcfcf6',
    marginBottom:10,
    borderRadius:10,
    padding:25,
    alignItems: "center",
    marginHorizontal: variables.sizes.margin,
  },
  note: {
    marginTop:10,

  },
  modalview:{
    marginBottom:10,
    borderRadius:10,
    marginHorizontal: variables.sizes.margin,
  },
  modalblock:{
    borderRadius:10,
    backgroundColor: "#fcfcf6",
    marginBottom:10,
  },
  modalButton: {
    backgroundColor: "#fcfcf6",
    width: width - 90,
    paddingVertical: 15,
    borderBottomWidth:1,
    borderColor: 'rgba(80, 69, 68, 0.28)',
  },
  modalTitle:{
    color: '#475c67'
  },
  startRideButton: {
    backgroundColor: '#ff8262',
    borderRadius: (width - 40) / 2,
    width: width - variables.sizes.margin,
    paddingVertical: 15
  },
  phoneButton: {
    backgroundColor: '#1eaa70',
    borderRadius: (width - 40) / 2,
    width: width - 90,
    paddingVertical: 15
  },
  startRideContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  startRideTitle: {
    fontSize: 22,
    fontWeight: '600'
    // backgroundColor: 'black'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerContainer: {
    backgroundColor: '#475c67',
    paddingLeft: 45,
    marginRight: 18,
    marginBottom: 10,
    borderRadius: (width - 40) / 2,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderWidth: 1,
    borderColor: '#475c67'
  },
  timerText: {
    fontSize: 35,
    color: '#fcfcf6'
  },
  textMask: {
    color: '#fcfcf6',
    fontSize: 22,
    fontWeight: '600'
  },
  phoneStyle: {
    borderRadius: (width - 40) / 2,
    backgroundColor: '#1EAA70',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 90
  }
});
