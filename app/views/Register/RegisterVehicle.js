import React, { Component } from 'react';
import {
  View, Text, TextInput, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import Block from '../../components/Block';
import Container from '../../components/Container';
import { CalendarButton } from '../../components/Button';

class RegisterVehicle extends Component {
  state = {
    carMake: '',
    carModel: '',
    carColor: '',
    seatBelts: null,
    year: null,
    errors: [],
  };

  handleSubmit = () => {
    alert('Thank you for registering');
    this.props.navigation.navigate('Welcome');
  };

  render() {
    const { errors } = this.state;

    return (
      <Container>
        <View style={[styles.signup, styles.headerPadding]}>
          <ScrollView>
            <KeyboardAvoidingView enabled behavior="padding">
              <Block style={styles.scrollContainer}>
                <Text style={styles.title}>Vehicle Info</Text>
                <Text style={styles.subTitle}>Continue with vehicle information</Text>
              </Block>
              <Block middle>
                <Block>
                  <Text style={styles.text}>Color</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.carColor}
                  onChangeText={text => this.setState({ carColor: text })}
                  onSubmitEditing={() => {
                    this.seatBeltsTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Number of seatbelts</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.seatBelts}
                  onChangeText={text => this.setState({ seatBelts: text })}
                  ref={(input) => {
                    this.seatBeltsTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.yearTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Year</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  style={[styles.input]}
                  defaultValue={this.state.year}
                  onChangeText={number => this.setState({ year: number })}
                  ref={(input) => {
                    this.yearTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.carMakeTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Make</Text>
                </Block>
                <TextInput
                  returnKeyType="next"
                  autoCapitalize="none"
                  style={[styles.input]}
                  defaultValue={this.state.carMake}
                  onChangeText={text => this.setState({ carMake: text })}
                  ref={(input) => {
                    this.carMakeTextInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.carModelTextInput.focus();
                  }}
                  blurOnSubmit={false}
                />
                <Block style={{ paddingTop: 20 }}>
                  <Text style={styles.text}>Model</Text>
                </Block>
                <TextInput
                  returnKeyType="go"
                  autoCapitalize="none"
                  style={[styles.input]}
                  defaultValue={this.state.carModel}
                  onChangeText={text => this.setState({ carModel: text })}
                  ref={(input) => {
                    this.carModelTextInput = input;
                  }}
                  blurOnSubmit // leave true for last element
                />
                <Block style={styles.footer}>
                  <CalendarButton title="Submit" onPress={this.handleSubmit} />
                </Block>
              </Block>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default RegisterVehicle;
