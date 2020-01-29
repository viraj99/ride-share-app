import React from 'react';
import {
  Text,
  ScrollView,
  Picker,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { RegisterHeader } from '../../components/Header';

class RegisterAvailabilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stDatePicker: false,
      stTimePicker: false,
      endTimePicker: false,
      endDatePicker: false,
      availData: {},
      startDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      endDate: new Date(),
      editStDatePlaceholder: '',
      editStTimePlaceholder: '',
      editEndTimePlaceholder: '',
      editEndDatePlaceholder: ''
    };
  }

  componentDidMount() {
    if (
      this.props.navigation.state.params.editItem.id !== null ||
      this.props.navigation.state.params.editItem === null
    ) {
      let editItem = this.props.navigation.state.params.editItem;
      let editStartDate = editItem.startTime;
      let slicePoint = editStartDate.indexOf(' ');
      let editStDtPlaceholder = editStartDate.slice(0, slicePoint);
      editStDtPlaceholder = moment
        .utc(editStDtPlaceholder)
        .format('MMMM D, YYYY');
      let editStTmPlaceholder = moment.utc(editItem.startTime).format('h:mm A');
      let editEndTmPlaceholder = moment.utc(editItem.endTime).format('h:mm A');
      let editEndDtPlaceholder = moment
        .utc(this.props.navigation.state.params.endDate)
        .format('MMMM D, YYYY');
      console.log(
        'when component mounts, recurring is: ',
        this.props.navigation.state.params.editItem.isRecurring
      );

      this.setState({
        editStDatePlaceholder: editStDtPlaceholder,
        editStTimePlaceholder: editStTmPlaceholder,
        editEndTimePlaceholder: editEndTmPlaceholder,
        editEndDatePlaceholder: editEndDtPlaceholder,
        editRecurring: this.props.navigation.state.params.editItem.isRecurring
      });
    } else {
    }
  }

  chgStartDate = (event, date) => {
    console.log('what format? ', date);
    let reformattedStartDate = moment.utc(date).format('MMMM D, YYYY');
    this.setState({
      stDatePicker: false,
      editStDatePlaceholder: reformattedStartDate
    });
    this.hideStDatePicker();
  };

  chgStartTime = (event, date) => {
    console.log('what format? ', date);
    let reformattedStartTime = moment(date).format('h:mm A');
    this.setState({
      stTimePicker: false,
      editStTimePlaceholder: reformattedStartTime
    });
    this.hideStTimePicker();
  };

  chgEndTime = (event, date) => {
    console.log('what format? ', date);
    let reformattedEndTime = moment(date).format('h:mm A');
    this.setState({
      endTimePicker: false,
      editEndTimePlaceholder: reformattedEndTime
    });
    this.hideEndTimePicker();
  };

  chgEndDate = (event, date) => {
    console.log('what format? ', date);
    let reformattedEndDate = moment.utc(date).format('MMMM D, YYYY');
    this.setState({
      endDatePicker: false,
      editEndDatePlaceholder: reformattedEndDate
    });
    this.hideEndDatePicker();
  };

  reformatTime = time => {
    console.log(time);
    let colon = time.indexOf(':');
    let space = time.indexOf(' ');
    let hours = time.slice(0, colon);
    let minutes = time.slice(colon + 1, space);
    console.log(minutes);
    let AMorPM = time.slice(space + 1, time.length);

    if (AMorPM === 'PM') {
      hours = parseInt(hours) + 12;
      hours = hours.toString();
    } else {
    }
    let reformat = hours + ':' + minutes + ':' + '00';
    return reformat;
  };

  setStartDate = (event, date) => {
    this.setState({
      startDate: date,
      stDatePicker: false
    });
    this.hideStDatePicker();
  };

  setStartTime = (event, time) => {
    this.setState({
      startTime: time,
      stTimePicker: false
    });
    this.hideStTimePicker();
  };

  setEndTime = (event, time) => {
    this.setState({
      endTime: time,
      endTimePicker: false
    });
    this.hideEndTimePicker();
  };

  setEndDate = (event, date) => {
    this.setState({
      endDate: date,
      endDatePicker: false
    });
    this.hideEndDatePicker();
  };

  showStDatePicker = () => {
    this.setState({ stDatePicker: true });
  };

  showStTimePicker = () => {
    this.setState({ stTimePicker: true });
  };

  showEndTimePicker = () => {
    this.setState({ endTimePicker: true });
  };

  showEndDatePicker = () => {
    this.setState({ endDatePicker: true });
  };

  hideStDatePicker = () => {
    this.setState({ stDatePicker: false });
  };

  hideStTimePicker = () => {
    this.setState({ stTimePicker: false });
  };

  hideEndTimePicker = () => {
    this.setState({ endTimePicker: false });
  };

  hideEndDatePicker = () => {
    this.setState({ endDatePicker: false });
  };

  //async await needed for proper Promise handling during submit function
  handleUserEdit = async (userEntries, recurring, navigation, editItem) => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    let endDate = userEntries.end_date;

    API.editAvailability(
      token.token,
      editItem.id,
      userEntries,
      recurring,
      endDate
    );
    navigation.navigate('AgendaView');
    alert('Your availability has been updated!');
  };

  //async await needed for proper Promise handling during submit function
  handleUserSubmit = async (userEntries, recurring, navigation) => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    let endDate = userEntries.end_date;
    console.log('checking nav in add avail: ', navigation);

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token);
    navigation.navigate('AgendaView');
    alert('Your availability has been added!');
  };

  addAnotherAvail = async (userEntries, recurring, navigation) => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    let endDate = userEntries.end_date;

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token);
    alert('Your availability has been added!');
    navigation.navigate('AvailabilityView');
  };

  handleRegistrationSubmit = async (userEntries, recurring) => {
    alert(
      'Thank you for registering! You will receive an email regarding next steps within _ business days.'
    );
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
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

  addAnotherAvailinRegistration = async (
    userEntries,
    recurring,
    navigation
  ) => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    let endDate = userEntries.end_date;

    //use API file, createAvailability fx to send user's availability to database; token required
    API.createAvailability(userEntries, recurring, endDate, token.token);
    alert('Your availability has been added!');
    navigation.navigate('AvailabilityView');
  };

  render() {
    const editMode = this.props.navigation.state.params.isEditing;
    const editItem = this.props.navigation.state.params.editItem;
    let availabilitySelectors;
    let {
      stDatePicker,
      stTimePicker,
      endTimePicker,
      endDatePicker
    } = this.state;
    const { navigation } = this.props;

    if (editMode === true) {
      console.log('Editing/Adding Avail from Login', editItem.id);
      if (editItem.id === null) {
        console.log('Adding Avail from Login', editItem);
        let addStartDate = moment
          .utc(this.state.startDate)
          .format('MMMM D, YYYY');
        let addStartTime = moment(this.state.startTime).format('h:mm A');
        let addEndTime = moment(this.state.endTime).format('h:mm A');
        let addEndDate = moment.utc(this.state.endDate).format('MMMM D, YYYY');
        let addAvailData = {
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

        return (
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.componentsContainer}>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AgendaView')}
                  >
                    <Icon name="chevron-left" size={36} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>Add Availability</Text>
                </View>
              </View>
            </View>

            <ScrollView>
              <View>
                <Text style={styles.labelStyleAvail}>
                  Availability Start Date:
                </Text>

                <Button
                  title={addStartDate}
                  onPress={this.showStDatePicker}
                  color="#475c67"
                />
                {stDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="date"
                    onChange={this.setStartDate}
                  />
                )}

                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Availability Start Time:
                </Text>

                <Button
                  title={addStartTime}
                  onPress={this.showStTimePicker}
                  color="#475c67"
                />
                {stTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="time"
                    display="spinner"
                    onChange={this.setStartTime}
                  />
                )}

                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Availability End Time:
                </Text>

                <Button
                  title={addEndTime}
                  onPress={this.showEndTimePicker}
                  color="#475c67"
                />
                {endTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="time"
                    display="spinner"
                    onChange={this.setEndTime}
                  />
                )}

                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Is this availability recurring?{' '}
                </Text>
                <Picker
                  label="Recurring"
                  key={availabilitySelectors}
                  inputPadding={16}
                  labelHeight={24}
                  borderHeight={2}
                  borderColor="#475c67"
                  blurOnSubmit={false}
                  selectedValue={this.state.is_recurring}
                  //set the item value (which will be the radius mileage) to state so it can be passed to API post; default to instruct user what to do
                  onValueChange={itemValue =>
                    this.setState({ is_recurring: itemValue })
                  }
                >
                  <Picker.Item label="Select One" value="null" />
                  <Picker.Item label="Yes" value="true" />
                  <Picker.Item label="No" value="false" />
                </Picker>

                {this.state.is_recurring === 'true' && (
                  <View>
                    <Text style={styles.labelStyleAvail}>
                      Date to End Recurring Availability:
                    </Text>
                    <Button
                      title={addEndDate}
                      onPress={this.showEndDatePicker}
                      color="#475c67"
                    />
                    {endDatePicker && (
                      <DateTimePicker
                        value={new Date()}
                        display="default"
                        onChange={this.setEndDate}
                      />
                    )}
                  </View>
                )}
              </View>
              <Text></Text>

              <View>
                <Button
                  title="Submit and Add Another Availability"
                  onPress={() =>
                    this.addAnotherAvail(
                      addAvailData,
                      this.state.is_recurring,
                      navigation
                    )
                  }
                  color="green"
                />

                <CalendarButton
                  title="Submit"
                  onPress={() =>
                    this.handleUserSubmit(
                      addAvailData,
                      this.state.is_recurring,
                      navigation
                    )
                  }
                />
              </View>
            </ScrollView>
          </View>
        );
      } else {
        let properStTimeDisplay = this.reformatTime(
          this.state.editStTimePlaceholder
        );
        let properEndTimeDisplay = this.reformatTime(
          this.state.editEndTimePlaceholder
        );
        let editedUserEntries = {
          start_time:
            moment(this.state.editStDatePlaceholder).format('YYYY-MM-DD') +
            ' ' +
            properStTimeDisplay,
          end_time:
            moment(this.state.editStDatePlaceholder).format('YYYY-MM-DD') +
            ' ' +
            properEndTimeDisplay,
          is_recurring: this.state.editRecurring,
          end_date: moment(this.state.editEndDatePlaceholder).format(
            'YYYY-MM-DD'
          ),
          //below values need to be changed, place-holding for now
          location_id: 1
        };

        return (
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.componentsContainer}>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AgendaView')}
                  >
                    <Icon name="chevron-left" size={36} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>Edit Availability</Text>
                </View>
              </View>
            </View>
            <ScrollView>
              <Block middle>
                <KeyboardAwareScrollView>
                  <Text style={styles.labelStyleAvail}>
                    Availability Start Date:
                  </Text>

                  <Button
                    title={this.state.editStDatePlaceholder}
                    onPress={this.showStDatePicker}
                    color="#475c67"
                  />
                  {stDatePicker && (
                    <DateTimePicker
                      value={new Date()}
                      display="default"
                      mode="date"
                      onChange={this.chgStartDate}
                    />
                  )}

                  <Text></Text>

                  <Text style={styles.labelStyleAvail}>
                    Availability Start Time:
                  </Text>

                  <Button
                    title={this.state.editStTimePlaceholder}
                    onPress={this.showStTimePicker}
                    color="#475c67"
                  />
                  {stTimePicker && (
                    <DateTimePicker
                      value={new Date()}
                      display="default"
                      mode="time"
                      display="spinner"
                      onChange={this.chgStartTime}
                    />
                  )}

                  <Text></Text>

                  <Text style={styles.labelStyleAvail}>
                    Availability End Time:
                  </Text>

                  <Button
                    title={this.state.editEndTimePlaceholder}
                    onPress={this.showEndTimePicker}
                    color="#475c67"
                  />
                  {endTimePicker && (
                    <DateTimePicker
                      value={new Date()}
                      display="default"
                      mode="time"
                      display="spinner"
                      onChange={this.chgEndTime}
                    />
                  )}

                  <Text></Text>

                  <Text style={styles.labelStyleAvail}>
                    Is this availability recurring?{' '}
                  </Text>
                  <Text style={styles.labelStyleAvail}>
                    Current selection: {editItem.isRecurring ? 'Yes' : 'No'}
                  </Text>
                  <Picker
                    label="Recurring"
                    key={availabilitySelectors}
                    inputPadding={16}
                    labelHeight={24}
                    borderHeight={2}
                    borderColor="#475c67"
                    blurOnSubmit={false}
                    selectedValue={this.state.editRecurring}
                    //set the item value (which will be the radius mileage) to state so it can be passed to API post; default to instruct user what to do
                    onValueChange={itemValue =>
                      this.setState({ editRecurring: itemValue })
                    }
                  >
                    <Picker.Item label="Change Selection" value="null" />
                    <Picker.Item label="Yes" value="true" />
                    <Picker.Item label="No" value="false" />
                  </Picker>

                  {this.state.editRecurring && (
                    // || this.state.is_recurring === 'true'
                    <View>
                      <Text style={styles.labelStyleAvail}>
                        Date to End Recurring Availability:
                      </Text>
                      <Button
                        title={this.state.editEndDatePlaceholder}
                        onPress={this.showEndDatePicker}
                        color="#475c67"
                      />
                      {endDatePicker && (
                        <DateTimePicker
                          value={new Date()}
                          display="default"
                          onChange={this.chgEndDate}
                        />
                      )}

                      <Text></Text>
                    </View>
                  )}

                  <Block style={styles.footer}>
                    <CalendarButton
                      title="Submit Changes"
                      onPress={() =>
                        this.handleUserEdit(
                          editedUserEntries,
                          this.state.editRecurring,
                          navigation,
                          editItem
                        )
                      }
                    />
                  </Block>
                </KeyboardAwareScrollView>
              </Block>
            </ScrollView>
          </View>
        );
      }
    } else {
      console.log('Adding availability from Registration');
      let registerStDate = moment(this.state.startDate).format('MMMM D, YYYY');
      let registerStTime = moment(this.state.startTime).format('h:mm A');
      let registerEndTime = moment(this.state.endTime).format('h:mm A');
      let registerEndDate = moment(this.state.endDate).format('MMMM D, YYYY');

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
      return (
        <View>
          <ScrollView>
            <RegisterHeader
              onPress={() => navigation.navigate('RegisterVehicle')}
              iconColor="#475c67"
            />
            <Block middle>
              <KeyboardAwareScrollView>
                <Block style={styles.scrollContainer}>
                  <Text style={styles.titleAvail}>Availability Info</Text>
                  <Text style={styles.subTitleAvail}>
                    Continue with availability information
                  </Text>
                </Block>

                <Text></Text>
                <Text style={styles.labelStyleAvail}>
                  Availability Start Date:
                </Text>

                <Button
                  title={registerStDate}
                  onPress={this.showStDatePicker}
                  color="#475c67"
                />
                {stDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="date"
                    onChange={this.setStartDate}
                  />
                )}
                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Availability Start Time:
                </Text>

                <Button
                  title={registerStTime}
                  onPress={this.showStTimePicker}
                  color="#475c67"
                />
                {stTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="time"
                    display="spinner"
                    onChange={this.setStartTime}
                  />
                )}
                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Availability End Time:
                </Text>

                <Button
                  title={registerEndTime}
                  onPress={this.showEndTimePicker}
                  color="#475c67"
                />
                {endTimePicker && (
                  <DateTimePicker
                    value={new Date()}
                    display="default"
                    mode="time"
                    display="spinner"
                    onChange={this.setEndTime}
                  />
                )}
                <Text></Text>

                <Text style={styles.labelStyleAvail}>
                  Is this availability recurring?{' '}
                </Text>
                <Picker
                  label="Recurring"
                  key={availabilitySelectors}
                  inputPadding={16}
                  labelHeight={24}
                  borderHeight={2}
                  borderColor="#475c67"
                  blurOnSubmit={false}
                  selectedValue={this.state.is_recurring}
                  //set the item value (which will be the radius mileage) to state so it can be passed to API post; default to instruct user what to do
                  onValueChange={itemValue =>
                    this.setState({ is_recurring: itemValue })
                  }
                >
                  <Picker.Item label="Select One" value="null" />
                  <Picker.Item label="Yes" value="true" />
                  <Picker.Item label="No" value="false" />
                </Picker>

                {this.state.is_recurring === 'true' && (
                  <View>
                    <Text style={styles.labelStyleAvail}>
                      Date to End Recurring Availability:
                    </Text>
                    <Button
                      title={registerEndDate}
                      onPress={this.showEndDatePicker}
                      color="#475c67"
                    />
                    {endDatePicker && (
                      <DateTimePicker
                        value={new Date()}
                        display="default"
                        onChange={this.setEndDate}
                      />
                    )}
                  </View>
                )}

                <Block style={styles.footer}>
                  <Button
                    title="Submit and Add Another Availability"
                    onPress={() =>
                      this.addAnotherAvailinRegistration(
                        userEntries,
                        this.state.is_recurring,
                        navigation
                      )
                    }
                    color="green"
                  />
                  <CalendarButton
                    title="Submit"
                    onPress={() =>
                      this.handleRegistrationSubmit(
                        userEntries,
                        this.state.is_recurring
                      )
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
}

export default RegisterAvailabilityForm;
