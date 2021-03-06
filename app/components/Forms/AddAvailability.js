import React from 'react';
import {
  Text,
  ScrollView,
  Picker,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Block from '../Block';
import { CalendarButton } from '../Button';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Container from '../Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

class AddAvailability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stDatePicker: false,
      stTimePicker: false,
      endTimePicker: false,
      endDatePicker: false,
    };
  }

  componentDidMount() {}

  setStartDate = (event, date) => {
    this.setState({
      startDate: date,
      stDatePicker: false,
    });
    this.hideStDatePicker();
  };

  setStartTime = (event, time) => {
    this.setState({
      startTime: time,
      stTimePicker: false,
    });
    this.hideStTimePicker();
  };

  setEndTime = (event, time) => {
    this.setState({
      endTime: time,
      endTimePicker: false,
    });
    this.hideEndTimePicker();
  };

  setEndDate = (event, date) => {
    this.setState({
      endDate: date,
      endDatePicker: false,
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
    console.log('checking nav in add avail: ', navigation);

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

  render() {
    let fromAgenda = JSON.stringify(this.props.navigation.state.params.item);
    console.log('item received from edit in Agenda: ', fromAgenda);
    let editItem = JSON.parse(fromAgenda);
    console.log('editItem is: ', editItem);
    let editStartDate = moment(editItem.startTime).format('MMM D, YYYY');
    let editStartTime = moment.utc(editItem.startTime).format('h:mm A');
    let editEndTime = moment.utc(editItem.endTime).format('h:mm A');
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
      location_id: 1,
    };

    let availabilitySelectors;
    let {
      stDatePicker,
      stTimePicker,
      endTimePicker,
      endDatePicker,
    } = this.state;
    const { navigation } = this.props;

    if (editItem.id === null) {
      return (
        <Container>
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
            <View onStartShouldSetResponder={() => true}>
              <Text style={styles.labelStyleAvail}>
                Availability Start Date:
              </Text>

              <Button
                title="Pick a Date"
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

              <Text style={styles.displaySelection}>
                Selected date:{' '}
                {moment(this.state.startDate).format('MMMM D, YYYY')}
              </Text>

              <Text style={styles.labelStyleAvail}>
                Availability Start Time:
              </Text>

              <Button
                title="Pick a Start Time"
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

              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.startTime).format('h:mm A')}
              </Text>

              <Text style={styles.labelStyleAvail}>Availability End Time:</Text>

              <Button
                title="Pick an End Time"
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
              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.endTime).format('h:mm A')}
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
                  <Button
                    title="Pick a Date"
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
                  <Text style={styles.displaySelection}>
                    Selected date:{' '}
                    {moment(this.state.endDate).format('MMMM D, YYYY')}
                  </Text>
                </View>
              )}

              <Block style={styles.footer}>
                <Button
                  title="Submit and Add Another Availability"
                  onPress={() =>
                    this.addAnotherAvail(
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
                    this.handleUserSubmit(
                      userEntries,
                      this.state.is_recurring,
                      navigation
                    )
                  }
                />
              </Block>
            </View>
          </ScrollView>
        </Container>
      );
    } else {
      return (
        <Container>
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
            <View onStartShouldSetResponder={() => true}>
              <Text style={styles.labelStyleAvail}>
                Availability Start Date:
                <Text> {editStartDate}</Text>
              </Text>

              <Button
                title="Change Date"
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

              <Text style={styles.displaySelection}>
                Selected date:{' '}
                {moment(this.state.startDate).format('MMM D, YYYY')}
              </Text>

              <Text style={styles.labelStyleAvail}>
                Availability Start Time:
                <Text> {editStartTime}</Text>
              </Text>

              <Button
                title="Change Time"
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

              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.startTime).format('h:mm A')}
              </Text>

              <Text style={styles.labelStyleAvail}>
                Availability End Time:
                <Text> {editEndTime}</Text>
              </Text>

              <Button
                title="Change Time"
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
              <Text style={styles.displaySelection}>
                Selected time: {moment(this.state.endTime).format('h:mm A')}
              </Text>

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
                selectedValue={this.state.is_recurring}
                //set the item value (which will be the radius mileage) to state so it can be passed to API post; default to instruct user what to do
                onValueChange={itemValue =>
                  this.setState({ is_recurring: itemValue })
                }
              >
                <Picker.Item label="Change Selection" value="null" />
                <Picker.Item label="Yes" value="true" />
                <Picker.Item label="No" value="false" />
              </Picker>

              {editItem.isRecurring && (
                // || this.state.is_recurring === 'true'
                <View>
                  <Text style={styles.labelStyleAvail}>
                    Date to End Recurring Availability:
                  </Text>
                  <Button
                    title="Change Date"
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
                  <Text style={styles.displaySelection}>
                    Selected date:{' '}
                    {moment(this.state.endDate).format('MMM D, YYYY')}
                  </Text>
                </View>
              )}

              <Block style={styles.footer}>
                <CalendarButton
                  title="Submit Changes"
                  onPress={() =>
                    this.handleUserEdit(
                      userEntries,
                      this.state.is_recurring,
                      navigation,
                      editItem
                    )
                  }
                />
              </Block>
            </View>
          </ScrollView>
        </Container>
      );
    }
  }
}

export default AddAvailability;
