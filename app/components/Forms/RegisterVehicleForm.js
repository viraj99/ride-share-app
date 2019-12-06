import React from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import {CalendarButton} from '../Button';
import {Sae} from '../TextInputs';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class RegisterVehicleForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        carData: {},
        startInsur: moment(new Date()).format("YYYY-MM-DD"),
        stopInsur: moment(new Date()).format("YYYY-MM-DD"),
        showFirstCal: this.props.showFirstCal,
        showSecondCal: this.props.showSecondCal,
      }
  }

  componentDidMount() {
  }

  handleDatePick = (pickedDate, id) => {
    console.log("date selected: ", pickedDate)
    this.props.handleChange(pickedDate, id);
    this.setState({
      startInsur: moment(pickedDate.nativeEvent.timestamp).format("YYYY-MM-DD"),
      showFirstCal: false,
      showSecondCal: false,
    });
  }

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries) => {
    console.log("testing in vehicle form: ", this.props.navigation);
    let token = await AsyncStorage.getItem('token')
    //parse just the token from the token object in async storage
    token = JSON.parse(token)
    //use API file, createVehicle fx to send user inputs to database, must pass token.token so only the token value itself and not the key:value pair of token is passed to api call for creating vehicle
    API.createVehicle(userEntries, token.token)
    .then(
      this.props.navigation.navigate('RegisterAvailability'))
    //if error performing API fetch for posting driver, show error
    .catch(error => {
      console.warn('There has been a problem with your operation: ' + error.message);
      throw error;
    })
  }

  render(){
    const {navigation, userEntries, showFirstCal, showSecondCal} = this.props;

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
              returnKeyType="next"
              onChangeText={text => this.props.handleChange(text, 'car_plate')}
              ref={input => this.props.innerRef(input, 'Plate')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Insurance')}
              blurOnSubmit={false}
            />
            <Sae
              label="Insurance Provider"
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
              onChangeText={text => this.props.handleChange(text, 'insurance_provider')}
              ref={input => this.props.innerRef(input, 'Insurance')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Insur Start')}
              blurOnSubmit={false}
            />

            <Sae
              label="Insurance Coverage Start Date"
              labelStyle={styles.labelStyle}
              inputPadding={16}
              labelHeight={12}
              // active border height
              borderHeight={2}
              borderColor="#475c67"
              style={[styles.saeInput]}
              inputStyle={styles.saeText}
              // TextInput props
              returnKeyType="next"
              // onChangeText={text => this.props.handleChange(text, 'insurance_start')}
              ref={input => this.props.innerRef(input, 'Insur Start')}
              placeholder={this.state.startInsur}
              onSubmitEditing={() => this.props.handleSubmitEditing('Insur Stop')}
              blurOnSubmit={false}
            />

            {showFirstCal && <DateTimePicker
              value={new Date()}
              mode='date'
              format="YYYY-MM-DD"
              display='calendar'
              onChange={(startDate) => this.handleDatePick(startDate, 'insurance_start')}
            />}

            <Sae
              label="Insurance Coverage End Date"
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
              // onChangeText={text => this.props.handleChange(text, 'insurance_stop')}
              ref={input => this.props.innerRef(input, 'Insur Stop')}
              onSubmitEditing={() => this.props.handleSubmitEditing('Done')}
              blurOnSubmit={false}
            />

            {showSecondCal && <DateTimePicker
              value={new Date()}
              mode='date'
              format="YYYY-MM-DD"
              display='calendar'
              onChange={(startDate) => this.handleDatePick(startDate, 'insurance_stop')}
            />}

            <Sae
              ref={input => this.props.innerRef(input, 'Done')}
              blurOnSubmit={false}
            />

            <Block style={styles.footer}>
              <CalendarButton title="Continue" onPress={() => this.handleUserSubmit(userEntries, navigation)} />
            </Block>
          </Block>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
};

export default RegisterVehicleForm;

// alert('Thank you for registering! You will receive an email regarding next steps within _ business days.'),
//         //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
//         API.logout(token.token)
//         .then(res => {
//           const loggedOut = res.json.Success;
//           if (loggedOut == 'Logged Out') {
//             AsyncStorage.removeItem('token');
//             nav.navigate('Welcome');
//           } else {
//             Alert.alert('Unable to Logout', 'Please try again.');
//           }
//         })
//         .catch(error => {
//           AsyncStorage.removeItem('token');
//           nav.navigate('Welcome');
//         })