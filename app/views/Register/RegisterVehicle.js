import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Container from '../../components/Container';
import { RegisterVehicleForm } from '../../components/Forms';
import RegisterHeader from './RegisterHeader';
import moment from 'moment';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      carData: {}
    };
    this.inputs = {};
  }

  handleBackButton = () => {
    console.log(this.props.navigation.state.params);
    if (
      this.props.navigation.state.params.isEditing ||
      this.props.navigation.state.params.isAdding
    ) {
      this.props.navigation.navigate('Settings');
    } else if (this.props.navigation.state.params.isCreating) {
      this.props.navigation.navigate('RegisterUserInfo');
    }
  };

  handleChange = (text, name) => {
    console.log('in registervehicle, handleChg: ', text);
    this.setState({ [name]: text });
  };

  handleSubmitEditing = id => {
    if (id === 'Insur Start') {
      Keyboard.dismiss();
    }

    const vehicleInfo = {
      vehicle: {
        car_make: this.state.car_make,
        car_model: this.state.car_model,
        car_year: this.state.car_year,
        car_color: this.state.car_color,
        car_plate: this.state.car_plate,
        seat_belt_num: this.state.seat_belt_num,
        insurance_provider: this.state.insurance_provider,
        insurance_stop: moment(this.state.insurance_start).format('YYYY-MM-DD'),
        insurance_start: moment(this.state.insurance_stop).format('YYYY-MM-DD')
      }
    };
    console.log('car data input is: ', vehicleInfo);
    this.setState({ carData: vehicleInfo });
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <RegisterHeader
          onPress={this.handleBackButton}
          title={'Vehicle Info'}
        />
        <RegisterVehicleForm
          navigation={navigation}
          handleChange={this.handleChange}
          innerRef={this.handleInnerRef}
          handleSubmitEditing={this.handleSubmitEditing}
          userEntries={this.state.carData}
        />
      </Container>
    );
  }
}

export default RegisterVehicle;
