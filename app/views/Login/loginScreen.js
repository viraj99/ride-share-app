import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './loginStyle';
import API from '../../api/api';
import Container from '../../components/Container';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      errorMessage: '',
      location: ''
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
  }

  componentDidMount() {
    this.findCoord();
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

  findCoord = () => {
    Geolocation.getCurrentPosition(
      position => {
        const long = JSON.stringify(position.coords.longitude);
        const lat = JSON.stringify(position.coords.latitude);
        let home = { lat: lat, lng: long };
        this.changeAddy(home);
        this.setState({ location: home });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  changeAddy = position => {
    console.log('position in changeaddy fx: ', position);
    let numLat = parseInt(position.lat);
    let numLong = parseInt(position.lng);
    let numPos = { lat: numLat, lng: numLong };
    Geocoder.geocodePosition(numPos).then(res => {
      console.log('result in changeAddy: ', res);
      let resultsArray = [];
      const result = Object.keys(res).map(i => resultsArray.push(res[i]));
      console.log('results converted', resultsArray[0].formattedAddress);
      this.setState({
        address: resultsArray[0].formattedAddress
      });
      console.log('address', result);
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <KeyboardAvoidingView style={styles.container} enabled>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.formTitleContainer}>
                <Text>
                  location here: {this.state.location.lat} by
                  {this.state.location.lng}
                  And Location in UF Format:
                  {this.state.address}
                </Text>
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
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

export default Login;
