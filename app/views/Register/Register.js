import React, {Component} from 'react';
import Container from '../../components/Container';
import {RegisterHeader} from '../../components/Header';
import {RegisterDriverForm} from '../../components/Forms';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: null,
      city: '',
      errors: [],
    };
    this.inputs = {};
  }

  handleChange = (text, name) => {
    this.setState({[name]: text});
  };

  handleSubmitEditing = id => {
    this.inputs[id].focus();
  };

  handleInnerRef = (input, id) => {
    this.inputs[id] = input;
  };

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
        />
      </Container>
    );
  }
}

export default Register;
