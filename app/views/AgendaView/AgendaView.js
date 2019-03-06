import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Agenda} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './AgendaStyles.js';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false,
      convertedDate: "",
      initTime: "",
      endTime: "",
      date: "",
      dateTimePickerVisibility: false,

    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={() => {console.log('hello')}}
          theme={{
            agendaTodayColor: '#1EAA70',
            agendaKnobColor: '#1EAA70',
            agendaDayNumColor: '#a8dbc5',
            agendaDayTextColor: '#a8dbc5',
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >

          <View style={{marginTop: 22}}>
            <View>
              <Text>Add Available Time</Text>
              
              
              

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={styles.modalClose}
              >
                <Icon name={"md-close"}  size={30} color="#475c67" />
              </TouchableHighlight>

              <View style={styles.submitButtonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.addToAgenda();
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <View style={styles.modalSubmit}>
                    <View style={styles.submitTextContainer}><Text style={styles.submitText}>Submit</Text></View>
                  </View>
                </TouchableHighlight>
              </View>

            </View>

            {/* out of the header */}
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Add Available Date</Text>
              </View>
              <View style={styles.datePickerContainer}>
                <DatePicker
                  style={{
                    width: 200,
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder="Available date"
                  format="h:mm a"
                  minDate="04-12-2018"
                  maxDate="04-12-2021"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon="false"
                  customStyles={{
                    dateIcon: {
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                  }}
                  onDateChange={(date) => {this.setState({date: date})
                                          this.convertDate(date);}}
                />
              </View>
              <View>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.initTime}
                  mode="time"
                  format="h:mm a"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  showIcon="false"
                  customStyles={{
                    dateIcon: {
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      borderWidth: 0
                    }
                  }}
                  onDateChange={(initTime) => {this.setState({initTime: initTime})
                                              console.log(this.state.initTime)}}
                />
              </View>
              <View>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.endTime}
                  mode="time"
                  format="h:mm a"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  showIcon="false"
                  customStyles={{
                    dateIcon: {
                      width: 0,
                      height: 0,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                  }}
                  onDateChange={(endTime) => {this.setState({endTime: endTime})
                                              console.log(this.state.endTime);}}
                />
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
       
       {/* button that opens modal */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {this.setModalVisible(true);}}
        >
          <Icon name={"md-add-circle"}  size={72} color="#ff8262" />
        </TouchableOpacity>  
      </View>
    );
  }
  componentDidMount(){
    const today = new Date();
    this.convertDate(today);
    this.setState({date: today});
  }
  
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          // for (let j = 0; j < numItems; j++) {
          //   this.state.items[strTime].push({
          //     name: 'Item for ' + strTime,
          //     height: Math.max(50, Math.floor(Math.random() * 150))
          //   });

        }
      }
      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      
      this.setState({
        items: newItems
      });
      console.log("ayy", this.state.items);
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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
    this.setState({convertedDate: convertedDate});
  }

  timeDifference = () => {
    return moment.utc(moment(this.state.endTime, "h:mm a").diff(moment(this.state.initTime, "h:mm a"))).format("H");
  }

  addToAgenda = () => {
    let newEvent = this.state.convertedDate;
    console.log('new event', newEvent)
    let newAgendaEntry = {
      name: `Available from ${this.state.initTime} until ${this.state.endTime}`,
      height: this.timeDifference() * 20
    };
    console.log("what is being added", newAgendaEntry);
    let stateCopy = this.state.items;
    stateCopy[newEvent].push(newAgendaEntry);
    this.setState({items: stateCopy});
    console.log("updated items", this.state.items);
    console.log(this.timeDifference())
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
}
