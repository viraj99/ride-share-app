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
import {
  MonthHeader, EmptyDay, WeekHeader, HeaderArrow, Availability,
} from '../../components/ScheduleItems';


const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
    header: 'header',
  },
];

const format = day => moment(day).format('X');

class ScheduleItem extends Schedule {
  constructor(type, startDate, endDate, timestamp, startTime, endTime, location, reoccurring) {
    super(type, startDate, endDate, timestamp);
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.reoccurring = reoccurring;
  }
}


export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      scheduleItems: [],
      overlayVisible: false,
      startPickerVisibility: false,
      endPickerVisibility: false,
      initTime: '',
      endTime: '',
      availableDate: '',
      userAddress: '',
      reoccurringCheck: false,
      temporaryDate: false,
      tempDateIndex: undefined,
      todayRendered: false,
    };
  }

  componentDidMount = () => {
    console.log('COMPONENT DID MOUNT');
    console.log('--------------------');
    console.log(this.props);
    this.populateAgenda();
  }

  // this function needs integration with Calendar component
  displayCurrentMonth = (month) => {
    let currentMonth = month.dateString;
    currentMonth = moment(currentMonth).format('MMMM YYYY');
    return currentMonth;
  }

  // creating initial array of elements to appear in flatlist
  populateAgenda = () => {
    const weeks = [];

    for (let i = -5; i <= 30; i += 1) {
      const weekday = moment().add(i, 'w');
      const start = moment(weekday).startOf('week');
      const end = moment(weekday).endOf('week');
      let monthEnd = moment(end).add(1, 'd');
      let betweenMonth = moment(end);

      betweenMonth = moment(betweenMonth).startOf('month');
      monthEnd = moment(monthEnd).startOf('month');

      if (moment(end).isSame(moment(start).endOf('month'))) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${monthEnd.format('MMMM YYYY')}`, 'none', `${monthEnd.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() !== moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
        const newMonth = new Schedule('monthHeader', `${betweenMonth.format('MMMM YYYY')}`, 'none', `${betweenMonth.format('X')}`);
        weeks.push(newWeek);
        weeks.push(newMonth);
      } else if (moment(start).month() === moment(end).month()) {
        const newWeek = new Schedule('weekHeader', `${start.format('MMM D')}`, `${end.format('X')}`, `${start.format('X')}`);
        weeks.push(newWeek);
      }
    }

    this.setState({
      scheduleItems: weeks,
    }, () => {
      this.initialDayRender();
    });
  }

  // keeping array in chronological order
  organizeArray = (a, b) => moment(a.timestamp, 'X') - moment(b.timestamp, 'X');

  // on first load, today's date is displayed and is at top of view
  initialDayRender = () => {
    const { scheduleItems, todayRendered } = this.state;
    const today = moment().startOf('day');

    if (!todayRendered && scheduleItems) {
      const initialDay = new Schedule('emptyDay', today, undefined, format(today));

      scheduleItems.push(initialDay);
      scheduleItems.sort(this.organizeArray);

      this.setState({ scheduleItems });

      const indexOfDay = this.findDayIndex(scheduleItems, 'startDate', today);
      this.flatListRef.scrollToIndex({ animated: false, index: indexOfDay, viewPosition: 0 });

      this.setState({ todayRendered: true });
    } else console.log('else hit');
  }

  // adding temporary day when date in calendar selected
  dayPressHandler = (day) => {
    const { scheduleItems, temporaryDate, tempDateIndex } = this.state;
    const arr = scheduleItems;
    if (temporaryDate && tempDateIndex > -1) {
      arr.splice(tempDateIndex, 1);
      this.setState({
        temporaryDate: false,
        tempDateIndex: undefined,
      });
    }
    const dayClicked = moment(day.dateString).startOf('day');
    console.log(moment(dayClicked));
    const emptyDay = new Schedule('emptyDay', dayClicked, undefined, moment(dayClicked).format('X'));
    console.log(emptyDay);

    arr.push(emptyDay);
    arr.sort(this.organizeArray);

    const indexOfDay = this.findDayIndex(arr, 'startDate', dayClicked);
    this.setState({
      temporaryDate: true,
      tempDateIndex: indexOfDay,
    });
    this.flatListRef.scrollToIndex({
      animated: true,
      index: indexOfDay,
      viewPosition: 0.1,
    });
  }

  // helper function to remove index of temporary day
  findDayIndex = (arr, attr, value) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (moment(arr[i][attr]).isSame(value, 'day')) {
        return i;
      }
    }
    return -1;
  }

  // what is displayed in accordion
  renderContent = () => (
    <View>
      <Calendar
        onMonthChange={(month) => { console.log(month); }}
        onDayPress={day => this.dayPressHandler(day)}
      />
    </View>
  )

  // collapsing tab render for accordion. need to change to ternary operator and export styles
  renderHeader = (item, _, isActive) => {
    if (!isActive) {
      return (
        <View style={{
          backgroundColor: '#1EAA70',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        >
          <Icon name="angle-down" color="white" size={20} />
        </View>
      );
    }
    return (
      <View style={{
        backgroundColor: '#1EAA70',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      >
        <Icon name="angle-up" color="white" size={20} />
      </View>
    );
  }

  // accordion stuff
  updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  // flatlist render function, need to turn these into components
  renderAgenda = ({ item }) => {
    const {
      startDate,
      endDate,
      endTime,
      startTime,
      location,
      reoccurring,
    } = item;

    if (item.type === 'weekHeader') {
      return (
        <WeekHeader
          start={startDate}
          end={endDate}
        />
      );
    } if (item.type === 'monthHeader') {
      return (
        <MonthHeader
          month={startDate}
        />
      );
    } if (item.type === 'availability') {
      return (
        <Availability
          date={startDate}
          initTime={startTime}
          endTime={endTime}
          location={location}
          reoccurring={reoccurring}
        />
      );
    } if (item.type === 'emptyDay') {
      return (
        <EmptyDay
          date={startDate}
          onPress={this.toggleForm}
        />
      );
    }
  }

  // Modal open
  toggleForm = () => {
    const overlayVisible = this.state;
    if (overlayVisible === true) {
      console.log('hi');
      this.setState({ overlayVisible: false });
    } else {
      console.log('sup');
      this.setState({ overlayVisible: true });
    }
  }

  // following functions handle date picker visibility
  showStartTimePicker = () => this.setState({ startPickerVisibility: true });

  hideStartTimePicker = () => this.setState({ startPickerVisibility: false });

  showEndTimePicker = () => this.setState({ endPickerVisibility: true });

  hideEndTimePicker = () => this.setState({ endPickerVisibility: false });

  // onSubmit handlers
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

  // time displayed for user
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

  // adding new schedule items to array
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

    // need better handling for this
    if (!availableDate || !initTime || !endTime || !userAddress) {
      console.log('form not completed, do something before you delete this log');
    }

    let arr = scheduleItems;

    if (reoccurringCheck) {
      for (let i = 0; i < 12; i += 1) {
        const newDate = moment(availableDate, 'X').add(i, 'w');
        const newTimestamp = moment(initTime, 'X').add(i, 'w');
        const newEndTime = moment(endTime, 'X').add(i, 'w');
        const repeatingItem = new ScheduleItem('availability', newDate, newEndTime, newTimestamp, newTimestamp, newEndTime, userAddress, reoccurringCheck);
        arr.push(repeatingItem);
        arr = arr.sort(this.organizeArray);
      }
    } else {
      const newAvailability = new ScheduleItem('availability', availableDate, endTime, initTime, initTime, endTime, userAddress, reoccurringCheck);
      // console.log(newAvailability);
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

  navigateBack = () => {
    const { navigation } = this.props;
    console.log(navigation);
    navigation.navigate('MainView');
  }

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
          leftComponent={<HeaderArrow onPress={this.navigateBack} />}
          centerComponent={{ text: 'Agenda', style: { color: '#fff', fontSize: 24, fontWeight: 'bold' } }}
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
              onScrollToIndexFailed={() => { console.log('scroll failed'); }}
              style={styles.flatlistContainer}
              data={scheduleItems}
              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={this.renderAgenda}
              extraData={this.state}
              keyExtractor={(item, index) => `list-item-${index}`}
            />
          </View>
          <Icon
            name="plus-circle"
            onPress={this.toggleForm}
            style={styles.addButton}
            size={72}
            color="#1EAA70"
          />
        </View>
        <Overlay
          height={280}
          isVisible={overlayVisible}
          onBackdropPress={() => { this.setState({ overlayVisible: false }); }}
          children={(
            <View style={styles.overlayContainer}>
              <View style={styles.inputRow}>
                <Button
                  onPress={this.showStartTimePicker}
                  title="Select Start Time"
                  buttonStyle={styles.formButton}
                />
                <Text style={styles.timeText}>{`${this.initTimeDisplay()}`}</Text>
              </View>
              <View style={styles.inputRow}>
                <Button
                  onPress={this.showEndTimePicker}
                  title="Select End Time"
                  buttonStyle={styles.formButton}
                />
                <Text style={styles.timeText}>{`${this.endTimeDisplay()}`}</Text>
              </View>
              <Input
                style={{ margin: 5 }}
                placeholder="Please input your address"
                onChangeText={text => this.setState({ userAddress: text })}
              />
              <CheckBox
                style={{ margin: 5 }}
                center
                title="Is this a weekly availability?"
                checked={reoccurringCheck}
                onPress={() => this.setState({ reoccurringCheck: !reoccurringCheck })}
                onIconPress={() => this.setState({ reoccurringCheck: !reoccurringCheck })}
              />
              <Button
                title="Submit"
                onPress={this.handleAgendaSubmit}
                buttonStyle={styles.formButton}
                style={{ margin: 5 }}
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
