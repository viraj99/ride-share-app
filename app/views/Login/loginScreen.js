import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, AsyncStorage, Image,
} from 'react-native';
import styles from './loginStyle.js';
import logo from './route.png';
import API from '../../api/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      errorMessage: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleUsername = (text) => {
    this.setState({
      user: text,
    });
  };

  handlePassword = (text) => {
    this.setState({
      pass: text,
    });
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validateUsername() {
    const { user } = this.state;
    if (user.includes('@') && user.includes('.com')) {
      return null;
    }
    this.setState({
      errorMessage: 'Please enter a valid email.',
    });
  }

  handleSubmit() {
    const { user, pass } = this.state;
    const { navigation } = this.props;
    const body = `email=${user}&password=${pass}`;
    const credentials = body;

    API.getLogin(credentials)
      .then((res) => {
        const obj = {
          token: res.json.auth_token,
        };

        if (obj.token === undefined) {
          this.setState({
            errorMessage: 'Invalid username or password.',
          });
        } else {
          AsyncStorage.setItem('token', JSON.stringify(obj));
          navigation.navigate('MainView');
        }
      })
      .catch((err) => {
        this.setState({
          errorMessage: 'Invalid username or password.',
        });
      });
  }

  handleSignUp() {
    console.log('sign up function hit');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}> Ride Share</Text>
          </View>
          <View style={styles.image}>
            <Image source={logo} />
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.formTitle}>Sign in</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              blurOnSubmit={false}
              style={styles.textInput}
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsername}
              onSubmitEditing={() => {
                this.validateUsername();
                this.focusNextField('two');
              }}
            />
          </View>
          <View style={styles.sectionContainer}>
            <TextInput
              secureTextEntry
              style={styles.textInput}
              blurOnSubmit={false}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.handlePassword}
              onSubmitEditing={() => {
                this.handleSubmit();
              }}
              ref={(input) => {
                this.inputs.two = input;
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.submitContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={() => this.handleSubmit()}>
                <Text style={styles.submitButtonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.signUpButton} onPress={() => this.handleSignUp()}>
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
