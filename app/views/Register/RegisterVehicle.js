import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import {RegisterVehicleForm} from '../../components/Forms';
import API from '../../api/api';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      carData: {},
    };
    this.inputs = {};
  }

  handleSubmit = () => {
    alert('Thank you for registering! You will receive an email regarding next steps within _ business days.');
    this.props.navigation.navigate('Welcome');
  };

  handleChange = (text, name) => {
    this.setState({[name]: text});
  };

  handleSubmitEditing = id => {
    this.inputs[id].focus();

    const vehicleInfo = {
      "vehicle":{
        "car_make": this.state.car_make,
        "car_model": this.state.car_model,
        "car_year": this.state.car_year,
        "car_color": this.state.car_color,
        "car_plate": this.state.car_plate,
        "seat_belt_num": this.state.seat_belt_num,

      }
    }
    console.log("data input is: ", vehicleInfo)
    this.setState({carData: vehicleInfo});
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    console.log("did token make it to vehicle reg page? ", this.props.token);
    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <RegisterVehicleForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            innerRef={this.handleInnerRef}
            handleSubmitEditing={this.handleSubmitEditing}
            token={this.state.token}
          />
        </View>
      </Container>
    );
  }
}

export default RegisterVehicle;
