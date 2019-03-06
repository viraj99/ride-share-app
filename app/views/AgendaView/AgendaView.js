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

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false,
      convertedDate: "",
      initTime: "12:00:00",
      endTime: "12:00:00",
      date: "02-06-2019",
      isDateTimePickerVisible: false,
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
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Add Available Time</Text>
              
              
              
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => { this.addToAgenda();
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Submit</Text>
              </TouchableHighlight>
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
       
        <TouchableOpacity
          style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.2)',
            alignItems:'center',
            justifyContent:'center',
            width:60,
            height:60,
            backgroundColor:'#fff',
            borderRadius:60,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 35,
            right: 10
          }}
          onPress={() => {this.setModalVisible(true);}}
        >
          <Icon name={"md-add-circle"}  size={72} color="#01a699" />
        </TouchableOpacity>  
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
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
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  convertDate(date) {
    const convertedDate = moment(date).format('YYYY-MM-DD');
    this.setState({convertedDate: convertedDate});
    
  }

  addToAgenda() {
    const newItems = {};
    newItems[this.state.convertedDate] = [];
    newItems[this.state.convertedDate].push({
      name: 'New item' + this.state.convertedDate,
      height: Math.max(50, Math.floor(Math.random() * 150))
    });
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      console.log("ayyy", newItems)
      this.setState({
        items: newItems
      });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});