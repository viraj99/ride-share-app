import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import { RegisterVehicleForm } from '../../components/Forms';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carMake: '',
      carModel: '',
      carColor: '',
      seatBelts: '',
      carYear: '',
      errors: [],
    };
    this.inputs = {};
  }

  handleSubmit = () => {
    alert('Thank you for registering');
    this.props.navigation.navigate('Welcome');
  };

  handleChange = (text, name) => {
    this.setState({ [name]: text });
  };

  handleSubmitEditing = (id) => {
    this.inputs[id].focus();
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <RegisterVehicleForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            innerRef={this.handleInnerRef}
            handleSubmitEditing={this.handleSubmitEditing}
          />
        </View>
      </Container>
    );
  }
}

export default RegisterVehicle;
