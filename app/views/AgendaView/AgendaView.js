
import React, { Component } from 'react';
import {
  Text, View, FlatList,
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
    startPickerVisibility: false,
    endPickerVisibility: false,
    initTime: '',
    endTime: '',
    availableDate: '',
    displayDate: '',
    userAddress: '',
    reoccurringCheck: false,
    temporaryDate: false,
    tempDateIndex: undefined,
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

      // if (i === 0) {
      //   const firstMonth = moment(weekday).startOf('month');
      //   //         console.log(firstMonth);
      //   const initialMonth = new Schedule('monthHeader', `${firstMonth.format('X')}`, 'none', `${firstMonth.format('X')}`);
      //   weeks.push(initialMonth);
      // }
      if (moment(end).isSame(moment(start).endOf('month'))) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${monthEnd.format('MMM D')}`, 'none', `${monthEnd.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() !== moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${betweenMonth.format('MMM D')}`, 'none', `${betweenMonth.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() === moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
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
  // onAnimationEnd = () => {
  //   const isCollapsed = this.state;
  //   console.log('before', isCollapsed);
  //   this.setState({ isCollapsed: !isCollapsed });
  //   console.log('after', isCollapsed);
  // }

  renderHeader = (item, _, isActive) => {
    if (!isActive) {
      return (
        <View style={{
          backgroundColor: '#1EAA70', alignItems: 'center', justifyContent: 'center', marginTop: -2,
        }}
        >
          <Icon name="angle-down" color="white" size={20} />
        </View>
      );
    }
    return (
      <View style={{
        backgroundColor: '#1EAA70', alignItems: 'center', justifyContent: 'center', marginTop: -2,
      }}
      >
        <Icon name="angle-up" color="white" size={20} />
      </View>
    );
  }


  renderContent = () => (
    <View>
      <Calendar
        onMonthChange={(month) => { console.log(month); }}
        onDayPress={day => this.dayPressHandler(day)}
      />
    </View>
  )

  dayPressHandler = (day) => {
    const { scheduleItems } = this.state;
    const dayClicked = moment(day.dateString).startOf('day').format('MMM D');
    const emptyDay = new Schedule('emptyDay', dayClicked, undefined, moment(dayClicked).format('X'));

    const arr = scheduleItems;
    arr.push(emptyDay);
    arr.sort(this.organizeArray);

    const indexOfDay = this.findDayIndex(arr, 'startDate', dayClicked);
    this.setState({ temporaryDate: true, tempDateIndex: indexOfDay });
    this.flatListRef.scrollToIndex({ animated: true, index: indexOfDay });
  }

  findDayIndex = (arr, attr, value) => {
    for (let i = 0; i < arr.length; i += 1) {
      console.log('compared values', arr[i][attr], value);
      if (moment(arr[i][attr]).isSame(value, 'day')) {
        return i;
      }
    }
    return -1;
  }


  renderAgenda = ({ item }) => {
    //     console.log(item);
    const {
      startDate,
      endDate,
      endTime,
      startTime,
    } = item;

    if (item.type === 'weekHeader') {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            {moment(startDate).format('MMM D')}
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
          <Text>{moment(startDate).format('MMMM')}</Text>
        </View>
      );
    } if (item.type === 'availability') {
      return (
        <View style={{ borderWidth: 1, borderColor: 'black' }}>
          <Text>
            date
            {' '}
            {moment(startTime, 'X').format('MMM Do')}
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
    } if (item.type === 'emptyDay') {
      return (
        <View style={{ borderWidth: 1, borderColor: 'black' }}>
          <Text>
            date
            {' '}
            {moment(startTime, 'X').format('MMM Do')}
          </Text>
          <Text>
            empty day homie
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

  showStartTimePicker = () => this.setState({ startPickerVisibility: true });

  hideStartTimePicker = () => this.setState({ startPickerVisibility: false });

  showEndTimePicker = () => this.setState({ endPickerVisibility: true });

  hideEndTimePicker = () => this.setState({ endPickerVisibility: false });

  handleStartTimePicker = (time) => {
    const convertedTime = moment(time).format('X');
    const date = moment(time).startOf('day').format('X');
    this.setState({
      initTime: convertedTime,
      availableDate: date,
    });
    this.hideStartTimePicker();
  };

  handleEndTimePicker = (time) => {
    const convertedTime = moment(time).format('X');
    this.setState({ endTime: convertedTime });
    this.hideEndTimePicker();
  };

  // dateDisplayConditional = () => {
  //   const { displayDate, availableDate } = this.state;
  //   if (!availableDate) {
  //     return displayDate;
  //   } return moment(availableDate, 'X').format('ddd, MMMM Do, YYYY');
  // }

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

    let arr = scheduleItems;

    if (reoccurringCheck) {
      for (let i = 0; i < 12; i++) {
        const newDate = moment(availableDate, 'X').add(i, 'w');
        const newTimestamp = moment(initTime, 'X').add(i, 'w');
        const newEndTime = moment(endTime, 'X').add(i, 'w');
        const repeatingItem = new ScheduleItem('availability', newDate, newEndTime, newTimestamp, newTimestamp, newEndTime, userAddress, reoccurringCheck);
        arr.push(repeatingItem);
        arr = arr.sort(this.organizeArray);
      }
    } else {
      const newAvailability = new ScheduleItem('availability', availableDate, endTime, initTime, initTime, endTime, userAddress, reoccurringCheck);
      console.log(newAvailability);
      arr.push(newAvailability);
      arr = arr.sort(this.organizeArray);
    }
    this.setState({
      overlayVisible: !overlayVisible,
      scheduleItems: arr,
      availableDate: '',
      initTime: '',
      endTime: '',
      userAddress: '',
      reoccurringCheck: undefined,
    });
  }


  organizeArray = (a, b) => moment(a.timestamp, 'X') - moment(b.timestamp, 'X');


  render() {
    const {
      reoccurringCheck,
      activeSections,
      scheduleItems,
      overlayVisible,
      startPickerVisibility,
      endPickerVisibility,
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
            onAnimationEnd={this.animationEnd}
            expandFromBottom
          />
          <View>
            <FlatList
              data={scheduleItems}
              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={this.renderAgenda}
              extraData={this.state}
              keyExtractor={(item, index) => `list-item-${index}`}
            />
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
              {/* <View>
                <Button
                  onPress={this.showEndTimePicker}
                  title="Select End Time"
                />
                <Text>{}</Text>
              </View> */}
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
                isVisible={startPickerVisibility}
                onConfirm={this.handleStartTimePicker}
                onCancel={this.hideStartTimePicker}
                mode="datetime"
                is24Hour={false}
              />
              <DateTimePicker
                isVisible={endPickerVisibility}
                onConfirm={this.handleEndTimePicker}
                onCancel={this.hideEndTimePicker}
                mode="datetime"
                is24Hour={false}
              />
            </View>
          )}
        />

      </View>
    );
  }
}
