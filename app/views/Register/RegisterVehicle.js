import React, {Component} from 'react';
import { View } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import {RegisterVehicleForm} from '../../components/Forms';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      carData: {},
    };
    this.inputs = {};
  }

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
            "insurance_provider": this.state.insurance_provider,
            "insurance_start": this.state.insurance_start,
            "insurance_stop": this.state.insurance_stop,
        }
    }
    console.log("car data input is: ", vehicleInfo)
    this.setState({carData: vehicleInfo});
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

  render() {
    const {navigation} = this.props;
    
    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <RegisterVehicleForm
            navigation={navigation}
            handleChange={this.handleChange}
            innerRef={this.handleInnerRef}
            handleSubmitEditing={this.handleSubmitEditing}
            userEntries={this.state.carData}
          />
        </View>
      </Container>
    );
  }
}

export default RegisterVehicle;
