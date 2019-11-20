import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import {RegisterVehicleForm} from '../../components/Forms';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      carData: {},
      token: AsyncStorage.getItem('token'),
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
            //placeholder for additional data not requested of user
            "insurance_provider": "",
            "insurance_start": new Date(),
            "insurance_stop": new Date(),
        }
    }
    console.log("car data input is: ", vehicleInfo)
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
            navigation={this.props.navigation}
            // handleSubmit={this.handleSubmit}
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
