import React, {Component} from 'react';
import { Keyboard } from 'react-native';
import Container from '../../components/Container';
import {RegisterHeader} from '../../components/Header';
import {RegisterDriverForm} from '../../components/Forms';
import API from '../../api/api';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization_id: '',
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      radius: '',
      is_active: '',
      application_state: '',

      data: {},
      radius: '',
      
      password: '',
      city: '',
      errors: [],
    };
    this.inputs = {};
  }

  handleChange = (text, name) => {
    this.setState({[name]: text});
  };

  handleSubmitEditing = id => {
    if (id === 'OrgName') {
      Keyboard.dismiss();
    } else {
      this.inputs[id].focus();
    }
    const registerInfo = {
      "driver":{
            "organization_id": "1",	
            "email": this.state.email,
            "password": this.state.password,
              "first_name": this.state.first_name,
              "last_name": this.state.last_name,
              "phone" : this.state.phone,
              "is_active" : true,
              "radius": this.state.radius,
              }
          
      }
    // console.warn("data?", registerInfo);
    this.setState({data: registerInfo});
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
    // console.warn("what is this? ", this.inputs);
  };

  // handleUserEntries() {
  //   // console.warn("data?", this.state.data);
  //   API.createDriver(this.state.data);
  // }

  render() {
    const {navigation} = this.props;
    const subTitle = "Let's start by creating an account";

    return (
      <Container>
        <RegisterHeader
          onPress={() => navigation.navigate('Welcome')}
          iconColor="#475c67"
        />
        <RegisterDriverForm
          subTitle={subTitle}
          navigation={navigation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          innerRef={this.handleInnerRef}
          handleSubmitEditing={this.handleSubmitEditing}
          // handleUserEntries={this.handleUserEntries}
          data={this.state.data}
        />
      </Container>
    );
  }
}

export default Register;
