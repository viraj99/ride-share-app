import React, { Component } from 'react';
import {
  View, Text, TextInput, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import Block from '../../components/Block';
import Container from '../../components/Container';
import { CalendarButton } from '../../components/Button';
import { RegisterHeader } from '../../components/Header';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: null,
    city: '',
    errors: [],
  };

  render() {
    const { navigation } = this.props;
    const subTitle = "Let's start by creating an account";

    return (
      <Container>
        <RegisterHeader onPress={() => navigation.navigate('Welcome')} iconColor="#475c67" />
        <View style={styles.signup}>
          <ScrollView>
            <KeyboardAvoidingView enabled behavior="padding">
              <Block style={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
              </Block>
              <Block middle>
                <Block>
                  <Text style={styles.text}>First Name</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.firstName}
                  onChangeText={text => this.setState({ firstName: text })}
                  onSubmitEditing={() => {
                    this.lastNameTextInput.focus();
                    this.setState({ isFocused: true });
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Last Name</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.lastName}
                  onChangeText={text => this.setState({ lastName: text })}
                  ref={(input) => {
                    this.lastNameTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.emailTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Email Address</Text>
                </Block>
                <TextInput
                  email
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  ref={(input) => {
                    this.emailTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.phoneTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Phone Number</Text>
                </Block>
                <TextInput
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.phoneNumber}
                  onChangeText={number => this.setState({ phoneNumber: number })}
                  ref={(input) => {
                    this.phoneTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.passwordTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Password</Text>
                </Block>
                <TextInput
                  secureTextEntry
                  returnKeyType="next"
                  autoCapitalize="none"
                  style={[styles.input]}
                  defaultValue={this.state.password}
                  onChangeText={text => this.setState({ password: text })}
                  ref={(input) => {
                    this.passwordTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.cityTextInput.focus();
                  }}
                  blurOnSubmit={false} // leave true for last element
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>City</Text>
                </Block>
                <TextInput
                  returnKeyType="go"
                  autoCapitalize="none"
                  style={[styles.input]}
                  defaultValue={this.state.city}
                  onChangeText={text => this.setState({ city: text })}
                  ref={(input) => {
                    this.cityTextInput = input;
                  }}
                  blurOnSubmit // leave true for last element
                />
                <Block style={styles.footer}>
                  <CalendarButton
                    title="Continue"
                    onPress={() => navigation.navigate('RegisterVehicle')}
                  />
                </Block>
              </Block>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default Register;
