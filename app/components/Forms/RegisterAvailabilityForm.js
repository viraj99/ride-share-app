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
import { showMessage, hideMessage } from 'react-native-flash-message';

class RegisterAvailabilityForm extends React.Component {

  constructor(props) {
    super(props);
    const isNewItem = props.navigation.state.params.item.id === null;
    console.log('isNewItem', isNewItem);
    if (!isNewItem) {
      var { params } = props.navigation.state;
    }
    this.state = {
      isRecurring: isNewItem ? false : params.item.isRecurring,
      availData: {
        startDate: isNewItem ? new Date() : params.item.startDate,
        endDate: isNewItem ? new Date() : params.item.endDate,
        startTime: isNewItem ? new Date() : params.item.startTime,
        endTime: isNewItem ? new Date() : params.item.endTime,
      },
    };
  }

  componentDidMount() { }

  setStartDate = date => {
    this.setState({
      availData: {
        ...this.state.availData,
        startDate: date,
      },
    });
  };

  setStartTime = time => {
    this.setState({
      availData: {
        ...this.state.availData,
        startTime: time,
      },
    });
  };

  setEndTime = time => {
    this.setState({
      availData: {
        ...this.state.availData,
        endTime: time,
      },
    });
  };

  setEndDate = date => {
    this.setState({
      availData: {
        ...this.state.availData,
        endDate: date,
      },
    });
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async () => {

    const { availData, isRecurring } = this.state;
    console.log('in handlesubmit: ', isRecurring);

    // alert(
    //   'Thank you for registering! You will receive an email regarding next steps within _ business days.'
    // );
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);

    console.log('right before createAvail API: ', availData);

    let endDate = availData.endDate;

    function convertToUTC(date, time) {
      if (arguments.length > 1) {
        const startTimeFormatted =
          moment(date).format('ddd MMM DD YYYY') +
          ' ' +
          moment(time).format('HH:mm Z');

        var newDate = new Date(startTimeFormatted);

        const dateToUTC = moment.utc(newDate).format('YYYY-MM-DD HH:mm Z');
        return dateToUTC;
      }
      return moment.utc(date).format('YYYY-MM-DD Z');
    }

    // Convert entries to UTC for backend handling.
    const userEntries = {
      start_time: convertToUTC(availData.startDate, availData.startTime),
      end_time: convertToUTC(availData.startDate, availData.endTime),
      is_recurring: isRecurring,
      end_date: convertToUTC(endDate),
      //below values need to be changed, place-holding for now
      // Must pass a location from the driver.
      location_id: 1,
    };

    //use API file, createAvailability fx to send user's availability to database; token required
    // TODO: Use editAvailability api method here depending if user is editing entry.
    try {
      const response = await API.createAvailability(userEntries, isRecurring, endDate, token.token);
      showMessage({
        message: 'Availability Added. ',
        description: 'Thank you for volunteering!',
        type: 'info',
      });
      this.props.navigation.navigate('AgendaView', { response: { ...response } });
    } catch (err) {
      console.log('AVAILABILLITY ERR RES: ', err);
      showMessage({
        message: 'There was an error: ',
        description: this.state.errorMessage.error,
        type: 'danger',
      });
    }
  };

  render() {
    let { startDate, startTime, endTime, endDate } = this.state.availData;

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
                dateProp={startDate}
                display="default"
                mode="date"
                setDate={this.setStartDate}
              />

              <Text style={styles.displaySelection}>
                Selected date:
                {moment(startDate).format('MMMM D, YYYY')}
              </Text>
            </View>

            <Text style={styles.labelStyleAvail}>Availability Start Time:</Text>
            <View>
              <DatePickerView
                dateProp={startTime}
                display="default"
                mode="time"
                display="spinner"
                setDate={this.setStartTime} //setDate is a prop used for both date and date-time.
                title="Pick a Time"
              />
            </View>

            <Text style={styles.displaySelection}>
              Selected time: {moment(startTime).format('h:mm A')}
            </Text>

            <Text style={styles.labelStyleAvail}>Availability End Time:</Text>

            <View>
              <DatePickerView
                dateProp={endTime}
                display="default"
                mode="time"
                display="spinner"
                setDate={this.setEndTime}
                title="Pick a Time"
              />
            </View>

            <Text style={styles.displaySelection}>
              Selected time: {moment(endTime).format('h:mm  A')}
            </Text>

            <Text style={styles.labelStyleAvail}>
              Is this a weekly recurring?{' '}
            </Text>
            <ModalDropdown
              defaultValue="Select One"
              defaultIndex={this.state.isRecurring ? 1 : 0}
              onSelect={(i, v) => {
                const values = [false, true];
                if (values.includes(true, false)) {
                  return this.setState({ isRecurring: values[i] });
                }
                this.setState({ isRecurring: false });
              }}
              options={['No', 'Yes']}
              textStyle={[styles.sectionTitle, { color: '#475c67' }]}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownTextStyle}
              style={styles.modalDropdown}
            />

            {this.state.isRecurring && (
              <View>
                <Text style={styles.labelStyleAvail}>
                  Date to End Recurring Availability:
                </Text>
                <DatePickerView dateProp={endDate} display="default" setDate={this.setEndDate} />
                <Text style={styles.displaySelection}>
                  Selected date:{' '}
                  {moment(endDate).format('MMMM D, YYYY')}
                </Text>
              </View>
            )}

            {/* {this.state.isRecurring === 'true' && 
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
                  this.handleUserSubmit()
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
