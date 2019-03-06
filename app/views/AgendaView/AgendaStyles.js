import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 10
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fcfcf6",
  },
  modalHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1EAA70',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalClose: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 12,
  },
  submitButtonContainer: {
    flexDirection: 'row',
    marginRight: 12,
    marginBottom: 15
  },
  modalSubmit: {
    width: 80,
    height: 40,
    backgroundColor: "#ff8262",
    borderRadius: 30
  },
  addButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    backgroundColor:'#fff',
    borderRadius:60,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35,
    right: 10,   
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  submitTextContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContentContainer: {
    flex: 9,
    alignItems: "flex-start",
  },
  textContainer: {
    marginTop: 15,
    marginLeft: 20,
    // marginHorizontal: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475c67'
  },
  datePickerContainer: {
    alignSelf: "center"
    
  }
});