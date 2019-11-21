import React from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterVehicleForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        carData: {},
      }
  }

  componentDidMount() {
    console.log("we made it to vehicle registration!!!!", AsyncStorage.getItem('token'));
  }

  handleUserSubmit = (userEntries, nav) => {
    let token = AsyncStorage.getItem('token')
    console.log("do we have a token for API post in regCar? ", token)
    //use API file, createVehicle fx to send user inputs to database
    API.createVehicle(userEntries, token)
    .then(res => console.log(res))
    .then(
        alert('Thank you for registering! You will receive an email regarding next steps within _ business days.'),
        API.logout(token)
        .then(res => {
          const loggedOut = res.json.Success;
          if (loggedOut == 'Logged Out') {
            AsyncStorage.removeItem('token');
            nav.navigate('Welcome');
          } else {
            Alert.alert('Unable to Logout', 'Please try again.');
          }
        })
        .catch(error => {
          AsyncStorage.removeItem('token');
          nav.navigate('Welcome');
        })
    )
    //if error performing API fetch for posting driver, show error
    .catch(error => {
      console.warn('There has been a problem with your operation: ' + error.message);
      throw error;
    })
  }

  render(){
    const {navigation, userEntries} = this.props;
    return (
      <ScrollView>
        <KeyboardAwareScrollView>
          <Block style={styles.scrollContainer}>
            <Text style={styles.title}>Vehicle Info</Text>
            <Text style={styles.subTitle}>Continue with vehicle information</Text>
          </Block>
          <Block middle>
            <Sae
              label="Make"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'car_make')}
              ref={input => this.props.innerRef(input, 'Make')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Model')}
              blurOnSubmit={false}
            />
            <Sae
              label="Model"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'car_model')}
              ref={input => this.props.innerRef(input, 'Model')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Year')}
              blurOnSubmit={false}
            />
            <Sae
              label="Year"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={number => this.props.handleChange(number, 'car_year')}
              ref={input => this.props.innerRef(input, 'Year')}
              onSubmitEditing={() => this.props.handleSubmitEditing('SeatBelts')}
              blurOnSubmit={false}
            />
            <Sae
              label="Number of seatbelts"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={number => this.props.handleChange(number, 'seat_belt_num')}
              ref={input => this.props.innerRef(input, 'SeatBelts')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Color')}
              blurOnSubmit={false}
            />
            <Sae
              label="Color"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'car_color')}
              ref={input => this.props.innerRef(input, 'Color')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Plate')}
              blurOnSubmit={false}
            />
            <Sae
              label="License Plate"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="done"
              onChangeText={text => this.props.handleChange(text, 'car_plate')}
              ref={input => this.props.innerRef(input, 'Plate')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Plate')}
              // blurOnSubmit
            />
            <Block style={styles.footer}>
              <CalendarButton title="Submit" onPress={() => this.handleUserSubmit(userEntries, navigation)} />
            </Block>
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
};

export default RegisterVehicleForm;
