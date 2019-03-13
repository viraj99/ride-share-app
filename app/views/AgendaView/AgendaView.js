
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Agenda } from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import styles from './AgendaStyles';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false,
      displayDate: '',
      initTime: '',
      endTime: '',
      availableDate: '',
      datePickerVisibility: false,
      startTimePickerVisibility: false,
      endTimePickerVisibility: false,
      recurringCheck: false,
      userAddress: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const {
      items,
      modalVisible,
      datePickerVisibility,
      startTimePickerVisibility,
      endTimePickerVisibility,
      recurringCheck,
      userAddress,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems}
          selected={new Date()}
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
          onRequestClose={() => { this.setModalVisible(!modalVisible); }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.smallEmpty} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
                style={styles.modalClose}
              >
                <Icon name="md-close" size={30} color="#475c67" />
              </TouchableHighlight>
              <View style={styles.emptySpace} />
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
              <View style={styles.smallEmpty} />
            </View>

            {/* Body */}
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Add Availability</Text>
              </View>
              {/* Input Field */}
              <View style={styles.datePickerContainer}>
                <View style={styles.inputField}>
                  <View style={styles.grayColumn}>
                    <View style={styles.inputRow}>
                      <Text style={styles.titleText}>Date</Text>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.titleText}>Start Time</Text>
                    </View>
                    <View style={styles.inputRow}>
                      <Text style={styles.titleText}>End Time</Text>
                    </View>
                    <View style={styles.lastRow}>
                      <Text style={styles.titleText}>Location</Text>
                    </View>
                  </View>
                  <View style={styles.inputColumn}>
                    <View style={styles.inputRow}>
                      <TouchableOpacity onPress={this.showDatePicker}>
                        <Text style={styles.inputText}>{`${this.dateDisplayConditional()}`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                      <TouchableOpacity onPress={this.showStartTimePicker}>
                        <Text style={styles.inputText}>{`${this.initTimeDisplay()}`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inputRow}>
                      <TouchableOpacity onPress={this.showEndTimePicker}>
                        <Text style={styles.inputText}>{`${this.endTimeDisplay()}`}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.lastRow}>
                      <TextInput
                        style={styles.inputText}
                        onChangeText={text => this.setState({ userAddress: text })}
                        value={userAddress}
                        placeholder="Input Address"
                        placeholderTextColor="#D3D3D3"
                      />
                    </View>
                  </View>
                </View>
                <CheckBox
                  center
                  title="Is this a weekly availability?"
                  checked={recurringCheck}
                  onPress={() => this.setState({ recurringCheck: !recurringCheck })}
                  onIconPress={() => this.setState({ recurringCheck: !recurringCheck })}
                />
              </View>
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
    this.generateDisplayDate();
  }

  showDatePicker = () => this.setState({ datePickerVisibility: true });

  hideDatePicker = () => this.setState({ datePickerVisibility: false });

  showStartTimePicker = () => this.setState({ startTimePickerVisibility: true });

  hideStartTimePicker = () => this.setState({ startTimePickerVisibility: false });

  showEndTimePicker = () => this.setState({ endTimePickerVisibility: true });

  hideEndTimePicker = () => this.setState({ endTimePickerVisibility: false });

  handleDatePicked = (date) => {
    const newDate = this.convertDate(date);
    this.setState({ availableDate: newDate });
    this.hideDatePicker();
  };

  handleStartTimePicked = (time) => {
    const convertedTime = this.convertTime(time);
    this.setState({ initTime: convertedTime });
    this.hideStartTimePicker();
  };

  handleEndTimePicked = (time) => {
    const convertedTime = this.convertTime(time);
    this.setState({ endTime: convertedTime });
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
      // console.log(items);
      const newItems = {};
      Object.keys(items).forEach((key) => { newItems[key] = items[key]; });

      this.setState({
        items: newItems,
      });
      // console.log('ayy', items);
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
    if (date) {
      const convertedDate = moment(date).format('YYYY-MM-DD');
      return convertedDate;
    }
    const convertedDate = moment().format('YYYY-MM-DD');
    return convertedDate;
  }

  convertTime = (time) => {
    const convertedTime = moment(time).format('h:mm a');
    return convertedTime;
  }

  timeDifference = () => {
    const { endTime, initTime } = this.state;
    moment.utc(moment(endTime, 'h:mm a').diff(moment(initTime, 'h:mm a'))).format('H');
  }

  addToAgenda = () => {
    const {
      availableDate, initTime, endTime, items, userAddress,
    } = this.state;
    const newEvent = this.convertDate(availableDate);
    console.log('new event', newEvent);
    const newAgendaEntry = {
      name: `Start Time: ${initTime} End Time: ${endTime} Location: ${userAddress}`,
      height: this.timeDifference() * 20,
    };
    console.log('what is being added', newAgendaEntry);
    items[newEvent].push(newAgendaEntry);
    this.setState({ items });
    // console.log('updated items', items);
    this.stateClear();
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  checkBox = (checked) => {
    this.setState({ recurringCheck: !checked });
  }

  generateDisplayDate = () => {
    let todaysDate = new Date();
    todaysDate = moment(todaysDate).format('ddd, MMMM Do, YYYY');
    this.setState({ displayDate: todaysDate });
  }

  stateClear = () => {
    this.setState({
      availableDate: '',
      initTime: '',
      endTime: '',
      userAddress: '',
    });
  }

  dateDisplayConditional = () => {
    const { displayDate, availableDate } = this.state;
    if (!availableDate) {
      return displayDate;
    } return moment(availableDate).format('ddd, MMMM Do, YYYY');
  }

  initTimeDisplay = () => {
    const { initTime } = this.state;
    if (!initTime) {
      return moment().format('hh:mm a');
    } return initTime;
  }

  endTimeDisplay = () => {
    const { endTime } = this.state;
    if (!endTime) {
      return moment().add(1, 'h').format('hh:mm a');
    } return endTime;
  }
}
