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
    const { navigation } = this.props;
    Alert.alert(`Credentials: ${username} + ${password}`);
    navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Ride Share</Text>
        </View>
        <View style={styles.image}>
          <Image source={logo} />
        </View>
        <View />
        <View styles={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign in</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.formTitle}>Username: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              value={this.state.username}
              onChangeText={this.handleUsername}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.formTitle}>Password:</Text>

            <TextInput
              secureTextEntry
              style={styles.textInput}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.handlePassword}
            />
          </View>
          <View style={styles.sectionContainer}>
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
