import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';
import { CalendarButton } from '../../components/Button';

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
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.padding}>
            <Text style={styles.subTitle}>Enter your email</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ email: text })}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            value={email}
          />
          <View style={styles.padding}>
            <CalendarButton
              onPress={() => this.handleResetPress(email)}
              title="Reset Password"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;
