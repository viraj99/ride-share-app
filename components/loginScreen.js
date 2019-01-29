import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          login screen
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          name="username"
          onChangeText={this.handleUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={this.handlePassword}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
