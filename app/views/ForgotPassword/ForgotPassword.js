import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import logo from '../../utils/images/route.png';

class ForgotPassword extends Component {
  state = {
    email: '',
    error: ''
  };

  handleResetPress = email => {
    if (email) {
      console.log('email submitted:', email);
    } else {
      console.log('NO Email collected');
    }
  };

  render() {
    const { email } = this.state;
    return (
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
              <Text style={styles.formTitle}>Reset Password</Text>
              {/* <Text style={styles.subTitle}>Enter your email</Text> */}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.sectionContainer}>
                <View style={styles.icon}>
                  <Icon name="mail" size={20} color="#b1c1c8" />
                </View>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.textInput}
                  placeholder="example@gmail.com"
                  value={email}
                  onChangeText={text => this.setState({ email: text })}
                  returnKeyType="go"
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.submitContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.handleResetPress(email)}
                >
                  <Text style={styles.submitButtonText}>RESET PASSWORD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;
