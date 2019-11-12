import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {CalendarButton} from '../../components/Button';

class ForgotPassword extends Component {
  state = {
    email: '',
    error: '',
  };

  render() {
    const {email} = this.state;
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
            email
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            defaultValue={email}
          />
          <View style={styles.padding}>
            <CalendarButton
              onPress={() => console.log('reset pass')}
              title="Reset Password"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;
