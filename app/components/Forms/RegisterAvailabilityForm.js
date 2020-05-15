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
import DatePickerView from '../../views/DatePickerView/DatePickerView';

class RegisterAvailabilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      availData: {}
    };
  }

  componentDidMount() {}

  setStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  setStartTime = time => {
    this.setState({
      startTime: time
    });
  };

  setEndTime = time => {
    this.setState({
      endTime: time
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries, recurring) => {
    console.log('in handlesubmit: ', recurring);
    console.log('what type of info? ', typeof recurring);

    alert(
      'Thank you for registering! You will receive an email regarding next steps within _ business days.'
    );
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);

    console.log('right before createAvail API: ', userEntries);

    let endDate = userEntries.end_date;

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token)
      .then(
        //logout after submission complete, but this will change as registration expands to include availability, and redirect won't be to logout but to alt mainview which will display driver's approval/pending status
        API.logout(token.token)
          .then(res => {
            const loggedOut = res.json.Success;
            if (loggedOut == 'Logged Out') {
              AsyncStorage.removeItem('token');
              this.props.navigation.navigate('Welcome');
            } else {
              Alert.alert('Unable to Logout', 'Please try again.');
            }
          })
          .catch(error => {
            AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Welcome');
          })
      )
      .catch(err => {
        this.setState({
          errorMessage: 'Invalid username or password.'
        });
      });
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
      location_id: 1
    };

    let availabilitySelectors;
    let { startDate, startTime, endTime, endDate } = this.state;

    return (
      <ScrollView>
        <Block middle>
          <KeyboardAwareScrollView>
            <Block style={styles.scrollContainer}>
              <Text style={styles.titleAvail}>Availability Info</Text>
              <Text style={styles.subTitleAvail}>
                Continue with availability information
              </Text>
            </Block>

            <Text style={styles.labelStyleAvail}>Availability Start Date:</Text>
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

            <Text style={styles.labelStyleAvail}>Availability Start Time:</Text>
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
            <ModalDropdown
              defaultValue="Select One"
              onSelect={i => {
                const values = ['true', 'false'];
                this.setState({ is_recurring: values[i] });
              }}
              options={['Yes', 'No']}
              textStyle={[styles.sectionTitle, { color: '#475c67' }]}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownTextStyle}
              style={styles.modalDropdown}
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

            <Block style={styles.footer}>
              <CalendarButton
                title="Submit"
                onPress={() =>
                  this.handleUserSubmit(userEntries, this.state.is_recurring)
                }
              />
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ScrollView>
    );
  }
}

export default RegisterAvailabilityForm;
