import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import AddAvailability from '../../components/Forms/AddAvailability';
import styles from '../AvailabilityView/styles';
import RegisterAvailabilityForm from '../../components/Forms/RegisterAvailabilityForm';


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
  };

  handleChange = (text, name) => {
    this.setState({ [name]: text });
  };

  handleSubmitEditing = id => {
    if (id === 'Recurring') {
      Keyboard.dismiss();
    } else {
      this.inputs[id].focus();
    }

    const availInfo = {
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      is_recurring: this.state.is_recurring,
      end_date: this.state.end_date,
      //below values need to be changed, place-holding for now
      location_id: 1,
    };
    console.log('avail data input is: ', availInfo);
    this.setState({ availData: availInfo });
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    const { item, navigation } = this.props;
    console.log('item in AvailView: ', item);
    return (
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.componentsContainer}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AgendaView')}
              >
                <Icon name="chevron-left" size={36} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Add Availability</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.mainContainer}>
            <View style={styles.componentsContainer}>
              <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MainView')}>
                  <Icon name="chevron-left" size={36} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Add Availability</Text>
              </View>
            </View>
          </View> */}

        {/* <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={this.backButton}>
              <Icon color={`white`} name="close" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.pageTitle}>
            <Text style={styles.headerTitle}>Availability Page</Text>
          </View>
        </View>  */}

        {/*<AddAvailability navigation={this.props.navigation} />*/}
        <RegisterAvailabilityForm
          navigation={navigation}
          handleChange={this.handleChange}
          innerRef={this.handleInnerRef}
          handleSubmitEditing={this.handleSubmitEditing}
          userEntries={this.state.availData}
        />
      </Container>
    );
  }
}

export default AvailabilityView;
