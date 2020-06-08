import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './loginStyle';
import API from '../../api/api';
import Container from '../../components/Container';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      errorMessage: '',
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  handleUsername = text => {
    this.setState({
      user: text,
    });
  };

  handlePassword = text => {
    this.setState({
      pass: text,
    });
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }

  validateUsername() {
    const { user } = this.state;
    if (user.includes('@') && user.includes('.')) {
      return null;
    }
    this.setState({
      errorMessage: 'Please enter a valid email.',
    });
  }

  async handleSubmit() {
    const { user, pass } = this.state;
    const { navigation } = this.props;

    API.login(user.toLowerCase(), pass).then(res => {
      console.log('response from login', res);
      const token = res.json.auth_token;
      const userInfo = {
        userIsActive: res.json.active,
        userIsApproved: res.json.approved,
      };
      if (token === undefined) {
        this.setState({
          errorMessage: 'Invalid username or password.',
        });
      } else  {
        AsyncStorage.setItem('token', JSON.stringify({ token }));
        navigation.navigate('MainView', {
          isRegistering: false,
          ...userInfo,
        });
      }
      // console.log('login token', asynStorage.getItem('token'));
    });
    // console.log('login token: ', AsyncStorage.getItem('token'));
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <KeyboardAvoidingView style={styles.container} enabled>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.formTitleContainer}>
                <Text style={styles.formTitle}>Sign in</Text>
              </View>
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.sectionContainer}>
                  <View style={styles.icon}>
                    <Icon name="mail" size={20} color="#b1c1c8" />
                  </View>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    blurOnSubmit={false}
                    style={styles.textInput}
                    placeholderTextColor="#C0C0C0"
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={this.handleUsername}
                    onSubmitEditing={() => {
                      this.validateUsername();
                      this.focusNextField('two');
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.sectionContainer}>
                  <View style={styles.icon}>
                    <Icon name="lock" size={24} color="#b1c1c8" />
                  </View>
                  <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    blurOnSubmit={false}
                    placeholderTextColor="#C0C0C0"
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={this.handlePassword}
                    onSubmitEditing={this.handleSubmit}
                    ref={input => {
                      this.inputs.two = input;
                    }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.submitContainer}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                  style={styles.errorMessage}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                    }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default Login;
