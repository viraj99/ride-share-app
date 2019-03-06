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
      items: {},
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
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
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
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={styles.modalClose}
              >
                <Icon name="md-close" size={30} color="#475c67" />
              </TouchableHighlight>
              <View style={styles.submitButtonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.addToAgenda();
                    this.setModalVisible(!this.state.modalVisible);
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
                isVisible={this.state.datePickerVisibility}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDatePicker}
                mode="date"
              />
              <DateTimePicker
                isVisible={this.state.startTimePickerVisibility}
                onConfirm={this.handleStartTimePicked}
                onCancel={this.hideStartTimePicker}
                mode="time"
                is24Hour="false"
              />
              <DateTimePicker
                isVisible={this.state.endTimePickerVisibility}
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

  componentDidMount() {
    const today = new Date();
    this.convertDate(today);
    this.setState({ date: today });
  }

  showDatePicker = () => this.setState({ datePickerVisibility: true });

  hideDatePicker = () => this.setState({ datePickerVisibility: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);

    this.hideDatePicker();
  };

  showStartTimePicker = () => this.setState({ timePickerVisibility: true });

  hideStartTimePicker = () => this.setState({ timePickerVisibility: false });

  handleStartTimePicked = (time) => {
    console.log('A Time has been picked: ', time);
    this.hideStartTimePicker();
  };

  handleEndTimePicked = (time) => {
    console.log('A Time has been picked: ', time);
    this.hideEndTimePicker();
  };


  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => { newItems[key] = this.state.items[key]; });

      this.setState({
        items: newItems,
      });
      console.log('ayy', this.state.items);
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>You have not scheduled anything for this day yet</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  convertDate = (date) => {
    const convertedDate = moment(date).format('YYYY-MM-DD');
    this.setState({ convertedDate });
  }

  timeDifference = () => moment.utc(moment(this.state.endTime, 'h:mm a').diff(moment(this.state.initTime, 'h:mm a'))).format('H')

  addToAgenda = () => {
    const newEvent = this.state.convertedDate;
    console.log('new event', newEvent);
    const newAgendaEntry = {
      name: `Available from ${this.state.initTime} until ${this.state.endTime}`,
      height: this.timeDifference() * 20,
    };
    console.log('what is being added', newAgendaEntry);
    const stateCopy = this.state.items;
    stateCopy[newEvent].push(newAgendaEntry);
    this.setState({ items: stateCopy });
    console.log('updated items', this.state.items);
    console.log(this.timeDifference());
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
}
