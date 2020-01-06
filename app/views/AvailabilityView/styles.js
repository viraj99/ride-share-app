
// Mary Alice 10:56 AM
// Untitled 
import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import AddAvailability from '../../components/Forms/AddAvailability';
import styles from '../AvailabilityView/styles'
class AvailabilityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  backButton = () => {
    const { navigation } = this.props;
    navigation.navigate('AgendaView');
  }
  render() {    
    const {navigation} = this.props;
    return (
      <Container>
        <View
          style={[styles.headerContainer]}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={this.backButton}>
              <Icon color={`gray`} name="close" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>Availability Page</Text>
          </View>
        </View> 
        <AddAvailability navigation={this.props.navigation} />
      </Container>
    );
  }
}
export default AvailabilityView;
Collapse



new messages
Untitled 
import {StyleSheet, Dimensions, Platform} from 'react-native';
// import {getBottomSpace} from '../Header/StatusBar';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#475c67',
  },
  availListItem: {
    borderColor: 'gray',
    borderBottomWidth: 2,
    marginTop: 10,
    paddingBottom:10,
    marginLeft: 20,
    marginRight: 20,
  },
  flatListText: {
    fontSize: 18,
  },
  // footer: {
  //   marginTop: 20,
  //   paddingHorizontal: 32,
  //   paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : 0,
  // },
  addButton: {
    position: 'absolute',
    bottom: height / 17,
    right: width / 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flatlistContainer: {
    backgroundColor: '#fcfcf6',
  },
  formButton: {
    backgroundColor: '#ff8262',
  },
  inputRow: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});