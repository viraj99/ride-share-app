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
    const {item} = this.props
    console.log("item in AvailView: ", item)
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