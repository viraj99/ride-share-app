import React from 'react';
import { Text, ScrollView, View, TextInput, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton, BackButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class RegisterVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker1: false,
      picker2: false,
      car_make: '',
      car_model: '',
      car_year: '',
      car_color: '',
      car_plate: '',
      seat_belt_num: '',
      insurance_provider: '',
      insurance_start: '',
      insurance_stop: ''
    };
  }

  componentDidMount = () => {
    if (this.props.navigation.state.params.isEditing) {
      const vehicle = this.props.navigation.state.params.vehicle.item;
      this.setState({
        car_make: vehicle.car_make,
        car_model: vehicle.car_model,
        car_year: vehicle.car_year,
        car_color: vehicle.car_color,
        car_plate: vehicle.car_plate,
        seat_belt_num: vehicle.seat_belt_num,
        insurance_provider: vehicle.insurance_provider,
        insurance_start: vehicle.insurance_start,
        insurance_stop: vehicle.insurance_stop
      });
    }
  };

  setStartDate = (event, date) => {
    date = date || this.state.insurance_start;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      insurance_start: date,
      picker1: false
    });
    this.hidePicker1();
    console.log('Startdate: ', this.state.insurance_start);
  };

  setEndDate = (event, date) => {
    date = date || this.state.insurance_stop;
    this.setState({
      insurance_stop: date,
      picker2: false
    });
    this.hidePicker2();
    console.log('Stopdate: ', this.state.insurance_stop);
  };

  showPicker1 = () => {
    this.setState({ picker1: true });
  };

  showPicker2 = () => {
    this.setState({ picker2: true });
  };

  hidePicker1 = () => {
    this.setState({ picker1: false });
  };

  hidePicker2 = () => {
    this.setState({ picker2: false });
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async userEntries => {
    console.log('testing in vehicle form: ', this.props.navigation);
    let token = await AsyncStorage.getItem('token');
    //parse just the token from the token object in async storage
    token = JSON.parse(token);
    //use API file, createVehicle fx to send user inputs to database, must pass token.token so only the token value itself and not the key:value pair of token is passed to api call for creating vehicle
    API.createVehicle(userEntries, token.token)
      .then(this.props.navigation.navigate('RegisterAvailability'))
      //if error performing API fetch for posting driver, show error
      .catch(error => {
        console.warn(
          'There has been a problem with your operation: ' + error.message
        );
        throw error;
      });
  };

  render() {
    let userEntries = {
      vehicle: {
        car_make: this.state.car_make,
        car_model: this.state.car_model,
        car_year: parseInt(this.state.car_year),
        car_color: this.state.car_color,
        car_plate: this.state.car_plate,
        seat_belt_num: this.state.item4,
        insurance_provider: this.state.insurance_provider,
        insurance_start: moment(this.state.insurStartDate).format('YYYY-MM-DD'),
        insurance_stop: moment(this.state.insurEndDate).format('YYYY-MM-DD')
      }
    };

    const {
      car_make,
      car_model,
      car_year,
      car_color,
      car_plate,
      insurance_provider,
      seat_belt_num,
      insurance_start,
      insurance_stop,
      picker1,
      picker2
    } = this.state;
    // console.log('car_make', car_make);
    // car_makecar_make,
    return (
      <View>
        <BackButton
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <ScrollView>
          <Block middle>
            <KeyboardAwareScrollView>
              <Block style={styles.scrollContainer}>
                <Text style={styles.title}>Vehicle Info</Text>
                <Text style={styles.subTitle}>
                  Continue with vehicle information
                </Text>
              </Block>

              <Text style={styles.labelStyleAlt}>Car Make:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_make: text })}
                placeholder="ex. Toyota"
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carModel.focus();
                }}
                value={car_make}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>Car Model:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_model: text })}
                placeholder="ex. Camry"
                ref={input => {
                  this.carModel = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carYear.focus();
                }}
                value={car_model}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>Car Year:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_year: text })}
                placeholder="YYYY"
                ref={input => {
                  this.carYear = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carBelts.focus();
                }}
                value={car_year.toString()}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>Number of Seatbelts:</Text>
              <TextInput
                onChangeText={text => this.setState({ item4: text })}
                placeholder="#"
                ref={input => {
                  this.carBelts = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carColor.focus();
                }}
                value={seat_belt_num.toString()}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>Color:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_color: text })}
                placeholder="ex. Black"
                ref={input => {
                  this.carColor = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carPlate.focus();
                }}
                value={car_color}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>License Plate:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_plate: text })}
                placeholder="ex. PEG-1234"
                ref={input => {
                  this.carPlate = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carInsur.focus();
                }}
                value={car_plate}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>Insurance Provider:</Text>
              <TextInput
                onChangeText={text =>
                  this.setState({ insurance_provider: text })
                }
                placeholder="ex. Geico"
                ref={input => {
                  this.carInsur = input;
                }}
                value={insurance_provider}
                returnKeyType={'done'}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
                // onSubmitEditing={() => {this.carBelts.focus();}}
                // blurOnSubmit={false}
              ></TextInput>

              <Text style={styles.labelStyleAlt}>
                Insurance Coverage Start Date:
              </Text>

              <Button
                title="Pick a Date"
                onPress={this.showPicker1}
                color="#475c67"
              />
              {picker1 && (
                <DateTimePicker
                  value={new Date(insurance_start)}
                  onChange={this.setStartDate}
                />
              )}
              <Text style={styles.displaySelection}>
                Selected date:
                {moment(insurance_start).format('MMMM D, YYYY')}
              </Text>

              <Text></Text>

              <Text style={styles.labelStyleAlt}>
                Insurance Coverage End Date:
              </Text>
              <Button
                title="Pick a Date"
                onPress={this.showPicker2}
                color="#475c67"
              />
              {picker2 && (
                <DateTimePicker
                  value={new Date(insurance_stop)}
                  onChange={this.setEndDate}
                />
              )}
              <Text style={styles.displaySelection}>
                Selected date:
                {moment(insurance_stop).format('MMMM D, YYYY')}
              </Text>

              <Text></Text>
              <Block style={styles.footer}>
                <CalendarButton
                  title="Continue"
                  onPress={() =>
                    this.handleUserSubmit(userEntries, this.props.navigation)
                  }
                />
              </Block>
            </KeyboardAwareScrollView>
          </Block>
        </ScrollView>
      </View>
    );
  }
}

export default RegisterVehicleForm;
