
import React, { Component } from 'react';
import {
  Text, View, FlatList, ActivityIndicator,
} from 'react-native';
import {
  Header, Overlay, Input, Button, CheckBox,
} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './AgendaStyles';
import Schedule from './Schedule';


const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
    header: 'header',
  },

];

class ScheduleItem extends Schedule {
  constructor(type, startDate, endDate, timestamp, startTime, endTime, location, reoccurring) {
    super(type, startDate, endDate, timestamp);
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.reoccurring = reoccurring;
  }
}


export default class App extends Component {
  state = {
    activeSections: [],
    scheduleItems: [],
    overlayVisible: false,
    datePickerVisibility: false,
    startTimePickerVisibility: false,
    endTimePickerVisibility: false,
    initTime: '',
    endTime: '',
    availableDate: '',
    displayDate: '',
    userAddress: '',
    reoccurringCheck: false,
    isLoading: false,
  }


  displayCurrentMonth = (month) => {
    let currentMonth = month.dateString;
    currentMonth = moment(currentMonth).format('MMMM YYYY');
    return currentMonth;
  }

  generateDisplayDate = () => {
    const today = moment().format('ddd, MMMM Do, YYYY');
    this.setState({ displayDate: today });
  }

  populateAgenda = () => {
    const weeks = [];

    for (let i = 0; i <= 30; i++) {
      const weekday = moment().add(i, 'w');
      const start = moment(weekday).startOf('week');
      const end = moment(weekday).endOf('week');
      const monthEnd = moment(end).add(1, 'd');
      const betweenMonth = moment(end);

      if (i === 0) {
        const firstMonth = moment(weekday).startOf('month');
        const initialMonth = new Schedule('monthHeader', `${firstMonth.format('X')}`, 'none', `${firstMonth.format('X')}`);
        weeks.push(initialMonth);
      }
      if (moment(end).isSame(moment(start).endOf('month'))) {
        const newWeek = new Schedule('weekHeader', `${start.format('X')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${monthEnd.format('X')}`, 'none', `${monthEnd.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() !== moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('X')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${betweenMonth.format('X')}`, 'none', `${betweenMonth.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() === moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('X')}`, `${end.format('X')}`, `${start.format('X')}`);
        weeks.push(newWeek);
      }
    }
    this.setState({
      scheduleItems: weeks,
    });
  }

  componentDidMount = () => {
    this.populateAgenda();
    this.generateDisplayDate();
  }

  // componentDidUpdate = () => {

  // }


  renderHeader = () => (
    <View style={{
      backgroundColor: '#1EAA70', alignItems: 'center', justifyContent: 'center', marginTop: -2, zIndex: 2,
    }}
    >
      <Icon name="angle-down" color="white" size={20} />
    </View>
  )

  renderContent = () => (
    <View>
      <Calendar
        onMonthChange={(month) => { console.log(month); }}
      />
    </View>
  )

  renderAgenda = ({ item }) => {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
    } = item;

    if (item.type === 'weekHeader') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            {moment(startDate, 'X').format('MMM D')}
            {' '}
            -
            {' '}
            {moment(endDate, 'X').format('MMM D')}
          </Text>
        </View>
      );
    } if (item.type === 'monthHeader') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>{moment(startDate, 'X').format('MMMM')}</Text>
        </View>
      );
    } if (item.type === 'availability') {
      return (
        <View style={{ borderWidth: 1, borderColor: 'black' }}>
          <Text>
            date
            {' '}
            {moment(startDate, 'X').format('MMM Do')}
          </Text>
          <Text>
            start time
            {' '}
            {moment(startTime, 'X').format('h:mm a')}
          </Text>
          <Text>
            end time
            {' '}
            {moment(endTime, 'X').format('h:mm a')}
          </Text>
          <Text>
            address
            {' '}
            {item.location}
          </Text>
          <Text>
            reoccurring?
            {' '}
            {item.reoccurring}
          </Text>
        </View>
      );
    }
  }

  updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  openForm = () => {
    this.setState({ overlayVisible: true });
  }

  showDatePicker = () => this.setState({ datePickerVisibility: true });

  hideDatePicker = () => this.setState({ datePickerVisibility: false });

  showStartTimePicker = () => this.setState({ startTimePickerVisibility: true });

  hideStartTimePicker = () => this.setState({ startTimePickerVisibility: false });

  showEndTimePicker = () => this.setState({ endTimePickerVisibility: true });

  hideEndTimePicker = () => this.setState({ endTimePickerVisibility: false });

  handleDatePicked = (date) => {
    const newDate = moment(date).format('X');
    this.setState({ availableDate: newDate });
    this.hideDatePicker();
  };

  handleStartTimePicked = (time) => {
    const convertedTime = moment(time).format('X');
    this.setState({ initTime: convertedTime });
    this.hideStartTimePicker();
  };

  handleEndTimePicked = (time) => {
    const convertedTime = moment(time).format('X');
    this.setState({ endTime: convertedTime });
    this.hideEndTimePicker();
  };

  dateDisplayConditional = () => {
    const { displayDate, availableDate } = this.state;
    if (!availableDate) {
      return displayDate;
    } return moment(availableDate, 'X').format('ddd, MMMM Do, YYYY');
  }

  initTimeDisplay = () => {
    const { initTime } = this.state;
    if (!initTime) {
      return moment().format('h:mm a');
    } return moment(initTime, 'X').format('h:mm a');
  }

  endTimeDisplay = () => {
    const { endTime } = this.state;
    if (!endTime) {
      return moment().add(1, 'h').format('h:mm a');
    } return moment(endTime, 'X').format('h:mm a');
  }

  handleAgendaSubmit = () => {
    const {
      availableDate,
      initTime,
      endTime,
      userAddress,
      reoccurringCheck,
      scheduleItems,
      overlayVisible,
    } = this.state;

    this.setState({ isLoading: true });
    const arr = scheduleItems;

    if (reoccurringCheck) {
      for (let i = 0; i < 12; i++) {
        const newDate = moment(availableDate, 'X').add(i, 'w');
        const newTimestamp = moment(initTime, 'X').add(i, 'w');
        const newEndTime = moment(endTime, 'X').add(i, 'w');
        const repeatingItem = new ScheduleItem('availability', newDate, newEndTime, newTimestamp, newTimestamp, newEndTime, userAddress, reoccurringCheck);
        arr.push(repeatingItem);
        arr.sort(this.organizeArray);
      } console.log(arr);
    } else {
      const newAvailability = new ScheduleItem('availability', availableDate, endTime, initTime, initTime, endTime, userAddress, reoccurringCheck);
      arr.push(newAvailability);
      arr.sort(this.organizeArray);
    }
    this.setState({
      overlayVisible: !overlayVisible,
      scheduleItems: arr,
      isLoading: false,
      availableDate: '',
      initTime: '',
      endTime: '',
      userAddress: '',
      reoccurringCheck: undefined,
    });
  }


  organizeArray = (a, b) => moment(a.timestamp, 'X') - moment(b.timestamp, 'X')

  renderLoader = () => {
    const { isLoading } = this.state;
    if (!isLoading) return null;

    return (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }


  render() {
    const {
      reoccurringCheck,
      isLoading,
      activeSections,
      scheduleItems,
      overlayVisible,
      datePickerVisibility,
      startTimePickerVisibility,
      endTimePickerVisibility,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{
            flex: 1,
            backgroundColor: '#1EAA70',
          }}
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `${moment().format('MMMM YYYY')}`, style: { color: '#fff', fontSize: 24 } }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View style={{ flex: 10 }}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
            expandFromBottom
          />
          <View>
            {isLoading ? (
              this.renderLoader()
            ) : (
              <FlatList
                  data={scheduleItems}
                  renderItem={this.renderAgenda}
                  extraData={this.state}
                  keyExtractor={(item, index) => `list-item-${index}`}

                />
            )}
          </View>
          <Icon
            name="plus-circle"
            onPress={this.openForm}
            style={styles.addButton}
            size={72}
            color="#ff8262"
          />
        </View>
        <Overlay
          isVisible={overlayVisible}
          children={(
            <View>
              <View>
                <Button
                  onPress={this.showDatePicker}
                  title="Select Available Date"
                />
                <Text>{`${this.dateDisplayConditional()}`}</Text>
              </View>
              <View>
                <Button
                  onPress={this.showStartTimePicker}
                  title="Select Start Time"
                />
                <Text>{`${this.initTimeDisplay()}`}</Text>
              </View>
              <View>
                <Button
                  onPress={this.showEndTimePicker}
                  title="Select End Time"
                />
                <Text>{`${this.endTimeDisplay()}`}</Text>
              </View>
              <Input
                placeholder="Please input your address"
                onChangeText={text => this.setState({ userAddress: text })}
              />
              <CheckBox
                center
                title="Is this a weekly availability?"
                checked={reoccurringCheck}
                onPress={() => this.setState({ reoccurringCheck: !reoccurringCheck })}
                onIconPress={() => this.setState({ reoccurringCheck: !reoccurringCheck })}
              />
              <Button
                title="Submit"
                onPress={this.handleAgendaSubmit}
              />
              {/* Date Picker modals  */}
              <DateTimePicker
                isVisible={datePickerVisibility}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDatePicker}
                mode="date"
              />
              <DateTimePicker
                isVisible={startTimePickerVisibility}
                onConfirm={this.handleStartTimePicked}
                onCancel={this.hideStartTimePicker}
                mode="time"
                is24Hour={false}
              />
              <DateTimePicker
                isVisible={endTimePickerVisibility}
                onConfirm={this.handleEndTimePicked}
                onCancel={this.hideEndTimePicker}
                mode="time"
                is24Hour={false}
              />
            </View>
          )}
        />

      </View>
    );
  }
}
