import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, Alert, Image,
} from 'react-native';
import styles from './loginStyle.js';
import logo from './route.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername = (text) => {
    this.setState({
      username: text,
    });
  };

  handlePassword = (text) => {
    this.setState({
      password: text,
    });
  };

  handleSubmit(username, password) {
    Alert.alert(`Credentials: ${username} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
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
          <View style={styles.sectionContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsername}
            />
          </View>
          <View style={styles.sectionContainer}>
            <TextInput
              secureTextEntry
              style={styles.textInput}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.handlePassword}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.submitContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.handleSubmit(this.state.username, this.state.password)}
            >
              <Text style={styles.submitButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
