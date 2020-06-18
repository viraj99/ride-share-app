import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Container from '../../components/Container';
import RegisterHeader from './RegisterHeader';
import { RegisterDriverForm } from '../../components/Forms';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }
  handleBackButton = () => {
    this.props.navigation.navigate('Welcome');
  };

  render() {
    const { navigation } = this.props;
    const subTitle = "Let's start by creating an account";

    return (
      <Container>
        <RegisterHeader onPress={this.handleBackButton} title={'Driver Info'} />

        <RegisterDriverForm subTitle={subTitle} navigation={navigation} />
      </Container>
    );
  }
}

export default Register;
