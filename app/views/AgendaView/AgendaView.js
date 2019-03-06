import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
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
      dateTimePickerVisibility: false,
    };
  }

  componentDidMount() {
    const today = new Date();
    this.convertDate(today);
    this.setState({ date: today });
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
  };

  loadItems(day) {
    const { items } = this.state;
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          // for (let j = 0; j < numItems; j++) {
          //   this.state.items[strTime].push({
          //     name: 'Item for ' + strTime,
          //     height: Math.max(50, Math.floor(Math.random() * 150))
          //   });
        }
      }
      console.log(items);
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });

      this.setState({
        items: newItems,
      });
      console.log('ayy', items);
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>You have not scheduled anything for this day yet</Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  convertDate = (date) => {
    const convertedDate = moment(date).format('YYYY-MM-DD');
    this.setState({ convertedDate });
  };

  timeDifference = () => {
    const { endTime, initTime } = this.state;
    moment.utc(moment(endTime, 'h:mm a').diff(moment(initTime, 'h:mm a'))).format('H');
  };

  render() {
    const { items, modalVisible, isDateTimePickerVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={() => {
            console.log('hello');
          }}
          theme={{
            agendaTodayColor: '#1EAA70',
            agendaKnobColor: '#1EAA70',
            agendaDayNumColor: '#a8dbc5',
            agendaDayTextColor: '#a8dbc5',
          }}
        />
        <Modal animationType="slide" transparent visible={modalVisible}>
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

            {/* out of the header */}
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Add Available Date</Text>
              </View>
              <View style={styles.datePickerContainer} />
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        {/* button that opens modal */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon name="md-add-circle" size={72} color="#ff8262" />
        </TouchableOpacity>
      </View>
    );
  }
}
