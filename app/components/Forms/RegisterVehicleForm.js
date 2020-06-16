import React, { useState } from 'react';
import { Text, ScrollView, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import DatePickerView from '../../views/DatePickerView/DatePickerView';

class RegisterVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedEntries: {
        vehicle: {},
      },
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
      insurance_stop: '',
      error: '',
    };
  }

  componentDidMount = () => {
    console.log(this.props);
    this.isItEditing();
  };

  isItEditing = () => {
    if (this.props.navigation.state.params.isEditing) {
      const vehicle = this.props.navigation.state.params.vehicle.item;
      this.setState({
        editedEntries: {
          vehicle: {},
        },
        car_make: vehicle.car_make,
        car_model: vehicle.car_model,
        car_year: vehicle.car_year,
        car_color: vehicle.car_color,
        car_plate: vehicle.car_plate,
        seat_belt_num: vehicle.seat_belt_num,
        insurance_provider: vehicle.insurance_provider,
        insurance_start: vehicle.insurance_start,
        insurance_stop: vehicle.insurance_stop,
      });
    } else {
      return null;
    }
  };

  setStartDate = date => {
    date = date || this.state.insurance_start;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      insurance_start: date,
      insurStartDate: date,
      picker1: false,
    });
  };

  setEndDate = date => {
    date = date || this.state.insurance_stop;
    this.setState({
      insurance_stop: date,
      insurEndDate: date,
      picker2: false,
    });
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
    token = JSON.parse(token);
    if (this.props.navigation.state.params.isEditing) {
      console.log('inside the if statement of isEditing');
      let id = this.props.navigation.state.params.vehicle.item.id;
      console.log('v id of if', id);
      let edited = this.state.editedEntries;
      edited.vehicle.car_make = this.state.car_make;
      edited.vehicle.car_model = this.state.car_model;
      edited.vehicle.car_year = this.state.car_year;
      edited.vehicle.car_color = this.state.car_color;
      edited.vehicle.car_plate = this.state.car_plate;
      edited.vehicle.seat_belt_num = this.state.seat_belt_num;
      edited.vehicle.insurance_provider = this.state.insurance_provider;
      edited.vehicle.insurance_start = this.state.insurance_start;
      edited.vehicle.insurance_stop = this.state.insurance_stop;
      console.log('this is b4 Api entries', edited);
      API.updateSettingsVehicle(id, edited, token.token)
        .then(() => {
          this.props.navigation.navigate('Settings');
          console.log('worked SO HARD');
        })
        .catch(err => {
          console.log('FAILED HORRIBLY');
        });
    } else {
      console.log('inside the if statement of create  vehicle');
      API.createVehicle(userEntries, token.token).then(res => {
        console.log('resp from create Vehicle', res);

        if (res.error) {
          this.setState({ error: res.error });
          return;
        }

        if (this.props.navigation.state.params.isAdding) {
          this.props.navigation.navigate('Settings', { addedVehicle: true });
        } else {
          this.props.navigation.navigate('RegisterAvailability');
        }
      });
    }
  };

  render() {
    let userEntries = {
      vehicle: {
        car_make: this.state.car_make,
        car_model: this.state.car_model,
        car_year: parseInt(this.state.car_year),
        car_color: this.state.car_color,
        car_plate: this.state.car_plate,
        seat_belt_num: this.state.seat_belt_num,
        insurance_provider: this.state.insurance_provider,
        insurance_start: moment(this.state.insurStartDate).format('YYYY-MM-DD'),
        insurance_stop: moment(this.state.insurEndDate).format('YYYY-MM-DD'),
      },
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
    } = this.state;

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>
                  Fill out with Vehicle information
                </Text>
              </View>
            </View>

            <Text style={styles.labelStyleAlt}>Car Make:</Text>
            <TextInput
              onChangeText={text => this.setState({ car_make: text })}
              placeholderTextColor="#C0C0C0"
              placeholder="ex. Toyota"
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.carModel.focus();
              }}
              value={car_make}
              blurOnSubmit={false}
              style={[styles.saeInputAlt]}
              inputStyle={styles.saeTextAlt}
            />

            <Text style={styles.labelStyleAlt}>Car Model:</Text>
            <TextInput
              onChangeText={text => this.setState({ car_model: text })}
              placeholderTextColor="#C0C0C0"
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
            />

            <Text style={styles.labelStyleAlt}>Car Year:</Text>
            <TextInput
              onChangeText={text => this.setState({ car_year: text })}
              placeholderTextColor="#C0C0C0"
              placeholder="YYYY"
              keyboardType="numeric"
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
            />

            <Text style={styles.labelStyleAlt}>Number of Seatbelts:</Text>
            <TextInput
              onChangeText={text => this.setState({ seat_belt_num: text })}
              placeholderTextColor="#C0C0C0"
              placeholder="#"
              ref={input => {
                this.carBelts = input;
              }}
              keyboardType="numeric"
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.carColor.focus();
              }}
              value={seat_belt_num.toString()}
              blurOnSubmit={false}
              style={[styles.saeInputAlt]}
              inputStyle={styles.saeTextAlt}
            />

            <Text style={styles.labelStyleAlt}>Color:</Text>
            <TextInput
              onChangeText={text => this.setState({ car_color: text })}
              placeholderTextColor="#C0C0C0"
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
            />

            <Text style={styles.labelStyleAlt}>License Plate:</Text>
            <TextInput
              onChangeText={text => this.setState({ car_plate: text })}
              placeholderTextColor="#C0C0C0"
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
            />

            <Text style={styles.labelStyleAlt}>Insurance Provider:</Text>
            <TextInput
              onChangeText={text => this.setState({ insurance_provider: text })}
              placeholderTextColor="#C0C0C0"
              placeholder="ex. Geico"
              ref={input => {
                this.carInsur = input;
              }}
              value={insurance_provider}
              returnKeyType={'done'}
              style={[styles.saeInputAlt]}
              inputStyle={styles.saeTextAlt}
            />

            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>
                  Insurance Coverage Start Date:{' '}
                </Text>
              </View>
            </View>

            <DatePickerView
              value={new Date() || new Date(insurance_start)}
              setDate={this.setStartDate}
            />

            {this.props.navigation.state.params.isEditing ? (
              <Text style={styles.displaySelection}>
                Selected date:
                {moment(insurance_start).format('MMMM D, YYYY')}
              </Text>
            ) : (
              <Text style={styles.displaySelection}>
                Selected date:{' '}
                {moment(this.state.insurStartDate).format('MMMM D, YYYY')}
              </Text>
            )}

            <Text />

            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>
                  Insurance Coverage End Date:{' '}
                </Text>
              </View>
            </View>

            <DatePickerView
              value={new Date() || new Date(insurance_stop)}
              setDate={this.setEndDate}
            />

            {this.props.navigation.state.params.isEditing ? (
              <Text style={styles.displaySelection}>
                Selected date:
                {moment(insurance_stop).format('MMMM D, YYYY')}
              </Text>
            ) : (
              <Text style={styles.displaySelection}>
                Selected date:{' '}
                {moment(this.state.insurEndDate).format('MMMM D, YYYY')}
              </Text>
            )}

            <Text />

            {this.state.error !== '' && (
              <View>
                <Text style={styles.errorMessage}>{this.state.error}</Text>
              </View>
            )}
            <Block style={styles.footer}>
              <CalendarButton
                title="Continue"
                onPress={() => this.handleUserSubmit(userEntries)}
              />
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    );
  }
}

export default RegisterVehicleForm;
