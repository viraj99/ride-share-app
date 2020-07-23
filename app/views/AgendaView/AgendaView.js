import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from '../../views/AgendaView/AgendaStyles';
import Container from '../../components/Container';
import { NavigationEvents } from 'react-navigation';
import { CalendarButton } from '../../components/Button';

class AgendaView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    //TODO: Refactor
    const value = await AsyncStorage.getItem('token');
    const parsedValue = JSON.parse(value);
    const realToken = parsedValue.token;
    this.setState({
      token: realToken,
    });
    this.getAvailability();
  };

  getAvailability = async () => {
    let token = this.state.token;
    let avails = await api.getAvailabilities(token);
    console.log('from API: ', avails);

    if (avails.json.length === 0) {
      this.setState({ renderAvails: false });
      return;
    } else {
      const result = [];
      const others = [];
      const map = new Map();
      for (const item of avails.json) {
        if (!map.has(item.eventId)) {
          map.set(item.eventId, true);
          result.push({
            id: item.eventId,
            startTime: item.startTime,
            startDate: item.startDate,
            endTime: item.endTime,
            endDate: item.endDate,
            isRecurring: item.isRecurring,
            day: item.startTime, //dont think we use this
            location: item.location,
          });
        } else {
          console.log('inside else');
          map.set(item.eventId, true);
          others.push({
            id: item.eventId,
            startTime: item.startTime,
            startDate: item.startDate,
            endTime: item.endTime,
            endDate: item.endDate,
            isRecurring: item.isRecurring,
            day: item.startTime, //same with this one
          });
        }
        this.setState(
          {
            response: result,
            others: others,
            renderAvails: true,
          },
          () => console.log('state', this.state)
        );
      }
    }
  };

  renderItem = item => {
    console.log('item in avail', item);
    const editItem = item;
    let id = item.id;
    let date = moment(item.startTime).format('MMMM D, YYYY');
    let start = moment(item.startTime)
      .local()
      .format('h:mm A');
    console.log('start', start);
    let end = moment(item.endTime)
      .local()
      .format('h:mm A');
    let day = moment(item.startTime).format('dddd');
    let endDate = item.endDate;
    console.log('end date test match', endDate);
    let ending = moment(endDate).format('MMMM D, YYYY');
    //console.log('maybe? ', ending);

    return (
      <View
        style={[styles.availListItem]}
        onStartShouldSetResponder={() => true}
      >
        <View style={styles.leftList}>
          <TouchableOpacity onPress={() => this.redirectToEditAvail(editItem)}>
            <Icon color={'#ff8262'} name="pencil" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.centerList}>
          {item.isRecurring && (
            <Text style={styles.flatListText}>Every {day}</Text>
          )}
          {!item.isRecurring && <Text style={styles.flatListText}>{date}</Text>}
          <Text style={styles.flatListText}>
            {start} to {end}
          </Text>
          {item.isRecurring && (
            <Text style={styles.flatListText}>until {ending}</Text>
          )}
        </View>

        <View style={styles.rightList}>
          <TouchableOpacity onPress={() => this.deleteAvail(id)}>
            <Icon color={'#ff8262'} name="delete" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  redirectToAddAvail = () => {
    const { navigation } = this.props;
    console.log('item being passed to form');
    navigation.navigate('RegisterAvailabilityForm', { new: true });
  };

  redirectToEditAvail = item => {
    const { navigation } = this.props;
    console.log('item being passed to form', item);
    navigation.navigate('RegisterAvailabilityForm', { new: false, item });
  };

  deleteAvail = async eventId => {
    let token = this.state.token;
    await api.deleteAvailability(token, eventId);
    this.getAvailability();
  };

  backButton = () => {
    const { navigation } = this.props;
    navigation.navigate('MainView');
  };

  render() {
    let noItem = { id: null };
    // //console.log('items from API call: ', this.state.response);
    // console.log('recurrences in API call: ', this.state.others);
    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getAvailability()} />

        <View style={styles.mainContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}
            >
              <Icon name="chevron-left" size={36} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.componentsContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Availability</Text>
            </View>
          </View>
        </View>

        {this.state.renderAvails ? (
          <FlatList
            data={this.state.response}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text style={styles.noAvailText}>
            There is no availability in your schedule, to add availability click
            the button below:
          </Text>
        )}
        <View style={styles.footer}>
          <CalendarButton
            onPress={this.redirectToAddAvail}
            title="Add Availability"
          />
        </View>
      </Container>
    );
  }
}

export default AgendaView;
