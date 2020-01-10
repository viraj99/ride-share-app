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
    console.log('props', this.props);
    const {
      car_make,
      car_model,
      car_year,
      car_color,
      car_plate,
      seat_belt_num,
      insurance_provider,
      insurance_start,
      insurance_stop
    } = this.props.navigation.state.params.vehicle.item;

    this.state = {
      editingEntries: {
        vehicle: {
          // car_make: this.props.navigation.car_make,
          // car_model: this.props.navigation.car_model,
          // car_year: this.props.navigation.car_year,
          // car_color: this.props.navigation.car_color,
          // car_plate: this.props.navigation.car_plate,
          // seat_belt_num: this.props.navigation.seat_belt_num,
          // insurance_provider: this.props.navigation.insurance_provider
        }
      },
      car_make,
      car_model,
      car_year,
      car_color,
      car_plate,
      seat_belt_num,
      insurance_provider,
      insurance_start,
      insurance_stop,
      picker1: false,
      picker2: false
    };
  }

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

  // show = mode => {
  //   this.setState({
  //     show: true,
  //     mode,
  //   });
  // }

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

    if (!this.props.navigation.state.params.isAdding) {
      API.createVehicle(userEntries, token.token)
        .then(this.props.navigation.navigate('RegisterAvailability'))
        //if error performing API fetch for posting driver, show error
        .catch(error => {
          console.warn(
            'There has been a problem with your operation: ' + error.message
          );
          throw error;
        });
    } else {
      API.createVehicle(userEntries, token.token)
        .then(this.props.navigation.navigate('Settings'))
        //if error performing API fetch for posting driver, show error
        .catch(error => {
          console.warn(
            'There has been a problem with your operation: ' + error.message
          );
          throw error;
        });
    }
  };

  handleEditSubmit = async () => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    let id = this.props.navigation.state.params.vehicle.item.id;
    // console.log('v id in handle edit', typeof id);
    let edited = this.state.editingEntries;
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
        console.log('worked');
      })
      .catch(err => {
        console.log('FAILED HORRIBLY');
      });
  };

  renderAddingVehicle = () => {
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
    const { picker1, picker2 } = this.state;
    return (
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
              blurOnSubmit={false}
              style={[styles.saeInputAlt]}
              inputStyle={styles.saeTextAlt}
            ></TextInput>

            <Text style={styles.labelStyleAlt}>Insurance Provider:</Text>
            <TextInput
              onChangeText={text => this.setState({ insurance_provider: text })}
              placeholder="ex. Geico"
              ref={input => {
                this.carInsur = input;
              }}
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
                value={new Date()}
                display="default"
                onChange={this.setStartDate}
              />
            )}
            <Text style={styles.displaySelection}>
              Selected date:{' '}
              {moment(this.state.insurStartDate).format('MMMM D, YYYY')}
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
                value={new Date()}
                display="default"
                onChange={this.setEndDate}
              />
            )}
            <Text style={styles.displaySelection}>
              Selected date:{' '}
              {moment(this.state.insurEndDate).format('MMMM D, YYYY')}
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
    );
  };

  renderEditingVehicle = () => {
    const {
      // car_make,
      // car_model,
      // car_year,
      // car_color,
      // car_plate,
      // seat_belt_num,
      // insurance_provider
      // insurance_stop
    } = this.props.navigation.state.params.vehicle.item;
    let editingEntries = {
      vehicle: {
        // car_make: car_make,
        // car_model: car_model,
        // car_year: car_year,
        // car_color: car_color,
        // car_plate: car_plate,
        // seat_belt_num: seat_belt_num,
        // insurance_provider: insurance_provider
        // insurance_stop: moment(insurance_stop).format('YYYY-MM-DD')
      }
    };
    //console.log('carYear', editingEntries.vehicle.car_year);
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
    console.log('car_color', car_color);

    return (
      <View>
        <ScrollView>
          <Block middle>
            <KeyboardAwareScrollView>
              <Block style={styles.scrollContainer}>
                <Text style={styles.title}>Vehicle Info</Text>
                <Text style={styles.subTitle}>Continue w/vehicle info</Text>
              </Block>

              <Text style={styles.labelStyleAlt}>Car Make:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_make: text })}
                placeholder={car_make}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carModel.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>Car Model:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_model: text })}
                placeholder={car_model}
                ref={input => {
                  this.carModel = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carYear.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>Car Year:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_year: text })}
                placeholder={car_year.toString()}
                ref={input => {
                  this.carYear = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carBelts.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>Num of Seatbelts</Text>
              <TextInput
                onChangeText={text => this.setState({ seat_belt_num: text })}
                placeholder={seat_belt_num.toString()}
                ref={input => {
                  this.carBelts = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carColor.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>Color: </Text>
              <TextInput
                onChangeText={text => this.setState({ car_color: text })}
                placeholder={car_color}
                ref={input => {
                  this.carColor = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.carPlate.focus();
                }}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>License Plate:</Text>
              <TextInput
                onChangeText={text => this.setState({ car_plate: text })}
                placeholder={car_plate}
                ref={input => {
                  this.carPlate = input;
                }}
                returnKeyType={'next'}
                onSubmitEditing={() => this.carInsur.focus()}
                blurOnSubmit={false}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

              <Text style={styles.labelStyleAlt}>Insurance Provider:</Text>
              <TextInput
                onChangeText={text =>
                  this.setState({ insurance_provider: text })
                }
                placeholder={insurance_provider}
                ref={input => {
                  this.carInsur = input;
                }}
                returnKeyType={'next'}
                style={[styles.saeInputAlt]}
                inputStyle={styles.saeTextAlt}
              />

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

              {/* <Text style={styles.labelStyleAlt}>Insurance Coverage End Date:</Text>
              <Button title="Pick a Date" onPress={this.showPicker2} color='#475c67'/>
              {picker2 && 
              <DateTimePicker
                value={ new Date()}
                display={moment(editingEntries.vehicle.insurance_end).format('MMMM D, YYYY')}
                onChange={this.setEndDate}
              />}
              <Text style={styles.displaySelection}>Selected date: 
                {moment(this.state.editingEntries.vehicle.insurance_end).format("MMMM D, YYYY")}
                {console.log('right after date picker:',moment(this.state.editingEntries.vehicle.insurance_end).format("MMMM D, YYYY"))}
              </Text> */}

              <Block style={styles.footer}>
                <CalendarButton
                  title="Continue"
                  onPress={() => this.handleEditSubmit()}
                />
                {/*editingEntries, this.props.navigation*/}
              </Block>
            </KeyboardAwareScrollView>
          </Block>
        </ScrollView>
      </View>
    );
  };

  render() {
    const isEditing = this.props.navigation.state.params.isEditing;
    const isAdding = this.props.navigation.state.params.isAdding;
    console.log('isEditiing', isEditing);
    console.log('isAdding', isAdding);
    console.log('DATE PICKED?', moment(insurance_start).format('MMMM D, YYYY'));
    return (
      <View>
        {(isEditing || isAdding) && (
          <BackButton
            onPress={() => this.props.navigation.navigate('Settings')}
          />
        )}
        {isEditing ? this.renderEditingVehicle() : this.renderAddingVehicle()}
      </View>
    );
  }
}

export default RegisterVehicleForm;
