import React, { Component } from 'react';
import Container from '../../components/Container';
import { RegisterDriverForm } from '../../components/Forms';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  render() {
    const { navigation } = this.props;
    const subTitle = "Let's start by creating an account";

    return (
      <Container>
        <RegisterDriverForm subTitle={subTitle} navigation={navigation} />
      </Container>
    );
  }
}

export default Register;
