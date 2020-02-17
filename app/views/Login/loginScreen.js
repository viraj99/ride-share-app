import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './loginStyle';
import API from '../../api/api';
import logo from '../../utils/images/route.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      errorMessage: ''
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  handleUsername = text => {
    this.setState({
      user: text
    });
  };

  handlePassword = text => {
    this.setState({
      pass: text
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
      errorMessage: 'Please enter a valid email.'
    });
  }

  handleSubmit() {
    const { user, pass } = this.state;
    const { navigation } = this.props;

    API.login(user, pass)
      .then(res => {
        const obj = {
          token: res.json.auth_token
        };
        //console.log('login token', token);
        if (obj.token === undefined) {
          this.setState({
            errorMessage: 'Invalid username or password.'
          });
        } else {
          AsyncStorage.setItem('token', JSON.stringify(obj));
          navigation.navigate('MainView');
        }
        console.log('login token', asynStorage.getItem('token'));
      })
      .catch(err => {
        this.setState({
          errorMessage: 'Invalid username or password.'
        });
      });
    console.log('login token: ', AsyncStorage.getItem('token'));
  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.container}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>CRSN</Text>
              <Text style={styles.title}>Community Ride Share Network</Text>
            </View>
            <View style={styles.image}>
              <Image source={logo} />
              {/* Icon made by Map & Navigation from www.flaticon.com */}
            </View>
          </View>
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
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={this.handlePassword}
                    onSubmitEditing={() => {
                      this.handleSubmit();
                    }}
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
                      textDecorationLine: 'underline'
                    }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
