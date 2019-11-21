import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from '../../components/Header';
import { UpcomingRideCard, RequestedRideCard } from '../../components/Card';
import { CalendarButton } from '../../components/Button';
import styles from './styles';
import variables from '../../utils/variables';
import API from '../../api/api';

type Props = {};

export default class MainView extends Component<Props> {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      scheduledRides: [],
      approvedRides: [],
      isLoading: true,
      token: '',
    };
  }

  handleToken = async () => {
    const value = await AsyncStorage.getItem('token');
    const parsedValue = JSON.parse(value);
    const realToken = parsedValue.token;
    this.setState({
      token: realToken,
    });
    this.ridesRequests();
  };

  ridesRequests = () => {
    const { token } = this.state;
    this.setState({ isLoading: true });
    API.getRides(token)
      .then(res => {
        const rides = res.rides;
        const scheduledRides = rides.filter(ride => ride.status === 'scheduled');
        const approvedRides = rides.filter(ride => ride.status === 'approved' || ride.status === 'pending');
        console.log('all rides', rides);
        console.log('scheduled', scheduledRides);
        console.log('approved', approvedRides);
        this.setState({
          scheduledRides,
          approvedRides,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = () => {
    this.handleToken();
  };

  renderLoader = () => {
    const { isLoading } = this.state;
    if (!isLoading) {
      return null;
    }

    return (
      <View style={styles.loader}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  upcomingScheduledRide = item => {
    const { token } = this.state;
    const { navigation } = this.props;
    const id = item.rider_id;
    const date = item.pick_up_time;
    // const name = item.riderName;
    const startLocation = [
      item.start_location.street,
      item.start_location.city,
      item.start_location.state,
    ];
    const endLocation = [
      item.end_location.street,
      item.end_location.city,
      item.end_location.state,
    ];
    const reason = item.reason
    return (
      <UpcomingRideCard
        key={item.driver_id}
        onPress={() => {
          navigation.navigate('RideView', {
            id,
            token,
            startLocation,
            endLocation,
            date,
            reason
          });
        }}
        date={item.pick_up_time}
        pickupLocation={startLocation.join(', ')}
        dropoffLocation={endLocation.join(', ')}
      />
    );
  };

  renderDots = () => {
    const { scheduledRides } = this.state;
    const dotPosition = Animated.divide(this.scrollX, variables.deviceWidth);
    return (
      <View style={styles.dotContainer}>
        {scheduledRides.slice(0, 3).map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, { borderWidth }]}
            />
          );
        })}
      </View>
    );
  };

  renderUpcomingRides = () => {
    const { scheduledRides } = this.state;
    const numRides = scheduledRides.length;
    const seeAll = `See all (${numRides})`;
    return (
      <View style={{ flex: 2 }}>
        <View style={styles.titleWrapper}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.subTitle}>Upcoming Schedule</Text>
          </View>
          {numRides > 3 ? (
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={this.navigateToDriverSchedule}>
                <Text style={styles.seeAllText}>{seeAll}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.seperator} />
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow: 'visible' }}
          data={scheduledRides.slice(0, 3)}
          keyExtractor={(item, index) => `${item.id}`} // id is not showing up in response
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } },
          ])}
          renderItem={({ item }) => this.upcomingScheduledRide(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  requestedRide = item => {
    const { token } = this.state;
    const { navigation } = this.props;
    const startLocation = [
      item.start_location.street,
      item.start_location.city,
      item.start_location.state,
    ];
    const endLocation = [
      item.end_location.street,
      item.end_location.city,
      item.end_location.state,
    ];
    const id = item.rider_id;
    const date = item.pick_up_time;
    const name = item.riderName;
    const reason = item.reason
    return (
      <RequestedRideCard
        key={item.driver_id}
        onPress={() => {
          navigation.navigate('RequestedRidesDetails', {
            id,
            token,
            startLocation,
            endLocation,
            date,
            name,
            reason,
          });
        }}
        name={name}
        date={date}
        pickupLocation={startLocation.join(', ')}
        dropoffLocation={endLocation.join(', ')}
      />
    );
  };

  renderRequestedRides = () => {
    const { approvedRides } = this.state;

    return (
      <View>
        <View style={styles.titlesContainer}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.subTitle}>Requested Rides</Text>
          </View>
        </View>
        <View style={styles.seperator} />
        <FlatList
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow: 'visible' }}
          data={approvedRides}
          keyExtractor={(item, index) => `${item.id}`} // id is not showing up in response
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } },
          ])}
          renderItem={({ item }) => this.requestedRide(item)}
        />
      </View>
    );
  };

  navigateToSettings = () => {
    const { navigation } = this.props;
    navigation.navigate('Settings');
  };

  navigateToCalendar = () => {
    const { navigation } = this.props;
    navigation.navigate('AgendaView');
  };

  navigateToDriverSchedule = () => {
    // takes me to ALL schedules rides
    const { scheduledRides } = this.state;
    const { navigation } = this.props;
    navigation.navigate('DriverScheduleView', { scheduledRides });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1EAA70" />
        <Header onPress={this.navigateToSettings} />
        {isLoading ? (
          this.renderLoader()
        ) : (
            <ScrollView
              scrollsToTop
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: variables.sizes.padding }}>
              {this.renderUpcomingRides()}
              {this.renderRequestedRides()}
            </ScrollView>
          )}
        <View style={styles.footer}>
          <CalendarButton onPress={this.navigateToCalendar} title="Agenda" />
        </View>
      </View>
    );
  }
}
