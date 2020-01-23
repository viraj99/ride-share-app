import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Container from '../../components/Container';
import RegisterHeader from './RegisterHeader';
import { RegisterDriverForm } from '../../components/Forms';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isCreating: true,
      // isEditing: false,
      // isAdding: false,
      errors: []
    };
  }
  handleBackButton = () => {
    this.props.navigation.navigate('Welcome');
  };
  // componentDidMount = () => {
  //   this.setState({
  //     isCreating: true
  //   });
  //   console.log('IN componentdidmount isCreating:', this.state.isCreating);
  // };
  render() {
    const { navigation } = this.props;
    const subTitle = "Let's start by creating an account";

    return (
      <Container>
        {/* <RegisterHeader
          onPress={() => navigation.navigate('Welcome')}
          iconColor="#475c67"
        /> */}
        <RegisterHeader onPress={this.handleBackButton} title={'Driver Info'} />
        <RegisterDriverForm subTitle={subTitle} navigation={navigation} />
      </Container>
    );
  }
}

export default Register;
