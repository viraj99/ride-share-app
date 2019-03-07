/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Agenda } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './AgendaStyles';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {} || '',
      modalVisible: false,
      convertedDate: '',
      initTime: '',
      endTime: '',
      date: '',
      datePickerVisibility: false,
      startTimePickerVisibility: false,
      endTimePickerVisibility: false,
    };
  }

  render() {
    const {
      items,
      modalVisible,
      datePickerVisibility,
      startTimePickerVisibility,
      endTimePickerVisibility,
      date,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems}
          selected={date}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          onDayPress={() => { console.log('hello'); }}
          theme={{
            agendaTodayColor: '#1EAA70',
            agendaKnobColor: '#1EAA70',
            agendaDayNumColor: '#a8dbc5',
            agendaDayTextColor: '#a8dbc5',
            selectedDayBackgroundColor: '#1EAA70',
            todayTextColor: '#a8dbc5',
            dotColor: '#1EAA70',
          }}
        />
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
                style={styles.modalClose}
              >
                <Icon name="md-close" size={30} color="#475c67" />
              </TouchableHighlight>
              <View style={styles.submitButtonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.addToAgenda();
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalSubmit}>
                    <View style={styles.submitTextContainer}>
                      <Text style={styles.submitText}>Submit</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>

            {/* Body */}
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Add Availability</Text>
              </View>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity onPress={this.showDatePicker}>
                  <Text>Availability Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showStartTimePicker}>
                  <Text>Availability Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showEndTimePicker}>
                  <Text>Availability End</Text>
                </TouchableOpacity>
              </View>
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
                is24Hour="false"
              />
              <DateTimePicker
                isVisible={endTimePickerVisibility}
                onConfirm={this.handleEndTimePicked}
                onCancel={this.hideEndTimePicker}
                mode="time"
                is24Hour="false"
              />
            </View>
            {/* Body */}

          </View>
        </Modal>

        {/* button that opens modal */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => { this.setModalVisible(true); }}
        >
          <Icon name="md-add-circle" size={72} color="#ff8262" />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount = () => {
    const today = new Date();
    this.convertDate(today);
    this.setState({ date: today });
  }

  showDatePicker = () => this.setState({ datePickerVisibility: true });

  hideDatePicker = () => this.setState({ datePickerVisibility: false });

  showStartTimePicker = () => this.setState({ startTimePickerVisibility: true });

  hideStartTimePicker = () => this.setState({ startTimePickerVisibility: false });

  showEndTimePicker = () => this.setState({ endTimePickerVisibility: true });

  hideEndTimePicker = () => this.setState({ endTimePickerVisibility: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);

    this.hideDatePicker();
  };

  handleStartTimePicked = (time) => {
    console.log('A start time has been picked: ', time);
    this.hideStartTimePicker();
  };

  handleEndTimePicked = (time) => {
    console.log('An end time has been picked: ', time);
    this.hideEndTimePicker();
  };

  loadItems = (day) => {
    const { items } = this.state;
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      console.log(items);
      const newItems = {};
      Object.keys(items).forEach((key) => { newItems[key] = items[key]; });

      this.setState({
        items: newItems,
      });
      console.log('ayy', items);
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem = item => (
    <View style={[styles.item, { height: item.height }]}>
      <Text>{item.name}</Text>
    </View>
  )

  renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text>You have not scheduled anything for this day yet</Text>
    </View>
  )

  rowHasChanged = (r1, r2) => r1.name !== r2.name

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  convertDate = (date) => {
    const convertedDate = moment(date).format('YYYY-MM-DD');
    return convertedDate;
  }

  timeDifference = () => {
    const { endTime, initTime } = this.state;
    moment.utc(moment(endTime, 'h:mm a').diff(moment(initTime, 'h:mm a'))).format('H');
  }

  addToAgenda = () => {
    const {
      convertedDate, initTime, endTime, items,
    } = this.state;
    const newEvent = convertedDate;
    console.log('new event', newEvent);
    const newAgendaEntry = {
      name: `Available from ${initTime} until ${endTime}`,
      height: this.timeDifference() * 20,
    };
    console.log('what is being added', newAgendaEntry);
    const stateCopy = items;
    stateCopy[newEvent].push(newAgendaEntry);
    this.setState({ items: stateCopy });
    console.log('updated items', items);
    console.log(this.timeDifference());
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
}
