import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';
import DatePickerView from '../../views/DatePickerView/DatePickerView';
import { showMessage, hideMessage } from 'react-native-flash-message';

class RegisterAvailabilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      availData: {},
      locations: [],
      locationData: [],
      selectedLocation: {},
      is_recurring: 'false',
    };
  }

  componentDidMount = async () => {
    const { item } = this.props.navigation.state.params;
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    console.log('token', token);
    console.log(
      'avail item inside edit',
      this.props.navigation.state.params.item
    );

    if (item.id !== null) {
      console.log('setting state for form');
      if (item.isRecurring) {
        //set recurring data in state
      }

      // set props data to state
      this.setState(
        {
          startDate: item.day,
          startTime: item.startTime,
          endTime: item.endTime,
        },
        () => console.log('this is state', this.state)
      );
    }

    API.getLocations(token.token).then(res => {
      const locations = res.locations;
      let locationData = [...this.state.locationData];
      locations.map(location => {
        console.log('locations', location);
        const value = {
          value:
            location.street +
            ' ' +
            location.city +
            ', ' +
            location.state +
            ' ' +
            location.zip,
        };

        if (location.default_location) {
          value.value += ' (Default)';
        }

        locationData.push(value);
      });
      this.setState({ locationData });
      this.setState({ locations }, () => {
        console.log('state for locations', this.state.locations);
      });
    });
  };

  handleLocationChange = (location, index) => {
    console.log('inside location change', index);
    const { locations } = this.state;
    const selectedLocation = locations[index].id;
    this.setState({ selectedLocation });
    console.log('id', selectedLocation);
  };
  setStartDate = date => {
    this.setState({
      startDate: date,
    });
  };

  setStartTime = time => {
    this.setState({
      startTime: time,
    });
  };

  setEndTime = time => {
    this.setState({
      endTime: time,
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date,
    });
  };

  handleRecurringChange = value => {
    if (value === 'Yes') {
      this.setState({ is_recurring: 'true' });
    } else this.setState({ is_recurring: 'false' });
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries, recurring) => {
    console.log('in handlesubmit: ', recurring);

    // alert(
    //   'Thank you for registering! You will receive an email regarding next steps within _ business days.'
    // );
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);

    console.log('right before createAvail API: ', userEntries);
    userEntries.location_id = this.state.selectedLocation;
    console.log('changing id', userEntries);

    let endDate = userEntries.end_date;

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token).then(
      response => {
        console.log('AVAILABILLITY RES: ', response);

        if (response.error) {
          this.setState({ error: response.error });
          return;
        }

        this.props.navigation.navigate('AgendaView', { response: response });
      }
    );
  };

  render() {
    const userEntries = {
      start_time:
        moment(this.state.startDate).format('YYYY-MM-DD') +
        ' ' +
        moment(this.state.startTime).format('HH:mm'),
      end_time:
        moment(this.state.startDate).format('YYYY-MM-DD') +
        ' ' +
        moment(this.state.endTime).format('HH:mm'),
      is_recurring: this.state.is_recurring,
      end_date: moment(this.state.endDate).format('YYYY-MM-DD'),
      //below values need to be changed, place-holding for now
      // Must pass a location from the driver.
      location_id: 1,
    };

    let availabilitySelectors;
    let { startDate, startTime, endTime, endDate } = this.state;

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Block style={styles.scrollContainer}>
                <Text style={styles.titleAvail}>Availability Info</Text>
                <Text style={styles.subTitleAvail}>
                  Continue with availability information
                </Text>
              </Block>

              <Text style={styles.labelStyleAvail}>
                Availability Start Date:
              </Text>
              <View>
                <DatePickerView
                  value={startDate}
                  display="default"
                  mode="date"
                  setDate={this.setStartDate}
                />

                <Text style={styles.displaySelection}>
                  Selected date:
                  {moment(this.state.startDate).format('MMMM D, YYYY')}
                </Text>
              </View>

              <Text style={styles.labelStyleAvail}>
                Availability Start Time:
              </Text>
              <View>
                <DatePickerView
                  value={startTime}
                  display="default"
                  mode="time"
                  display="spinner"
                  setDate={this.setStartTime} //setDate is a prop used for both date and date-time.
                  title="Pick a Time"
                />
              </View>

              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.startTime).format('h:mm A')}
              </Text>

              <Text style={styles.labelStyleAvail}>Availability End Time:</Text>

              <View>
                <DatePickerView
                  value={endTime}
                  display="default"
                  mode="time"
                  display="spinner"
                  setDate={this.setEndTime}
                  title="Pick a Time"
                />
              </View>

              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.endTime).format('h:mm  A')}
              </Text>

              <Text style={styles.labelStyleAvail}>
                Is this availability recurring?{' '}
              </Text>
              <Dropdown
                data={[{ value: 'Yes' }, { value: 'No' }]}
                label="Picked"
                value="No"
                containerStyle={{
                  bottom: 15,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                fontSize={18}
                onChangeText={value => this.handleRecurringChange(value)}
              />

              {this.state.is_recurring === 'true' && (
                <View>
                  <Text style={styles.labelStyleAvail}>
                    Date to End Recurring Availability:
                  </Text>
                  <DatePickerView
                    value={endDate}
                    display="default"
                    setDate={this.setEndDate}
                  />
                  <Text style={styles.displaySelection}>
                    Selected date:{' '}
                    {moment(this.state.endDate).format('MMMM D, YYYY')}
                  </Text>
                </View>
              )}

              {/* {this.state.is_recurring === 'true' && 
              <Sae 
                  label="End Recurring Schedule Date (YYYY-MM-DD)"
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
                  onChangeText={text => this.props.handleChange(text, 'end_date')}
                  ref={input => this.props.innerRef(input, 'EndDate')}
                  onSubmitEditing={() => this.props.handleSubmitEditing('EndDate')}
                //   blurOnSubmit={false}>
              />
            } */}
              {this.state.locationData.length > 0 && (
                <View>
                  <Text style={styles.labelStyleAvail}>Set Location</Text>
                  <Dropdown
                    data={this.state.locationData}
                    label="Location"
                    value="Select location"
                    containerStyle={{
                      bottom: 15,
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    fontSize={18}
                    onChangeText={(location, index) =>
                      this.handleLocationChange(location, index)
                    }
                  />
                </View>
              )}

              {this.state.locationData.length === 0 && (
                <Text
                  style={{
                    paddingTop: 5,
                    paddingLeft: 15,
                    paddingRight: 10,
                    fontSize: 18,
                    color: '#D8000C',
                  }}
                >
                  Please add a location to submit availability
                </Text>
              )}

              {this.state.error != '' && (
                <View>
                  <Text style={styles.errorMessage}>{this.state.error}</Text>
                </View>
              )}

              {this.state.locationData.length > 0 && (
                <Block style={styles.footer}>
                  <CalendarButton
                    title="Submit"
                    onPress={() =>
                      this.handleUserSubmit(
                        userEntries,
                        this.state.is_recurring
                      )
                    }
                  />
                </Block>
              )}
            </View>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    );
  }
}

export default RegisterAvailabilityForm;
