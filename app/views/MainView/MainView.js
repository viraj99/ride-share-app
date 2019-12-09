<<<<<<< HEAD
/* eslint-disable prettier/prettier */
=======
>>>>>>> fixed warning
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
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationEvents } from 'react-navigation';
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
      token: ''
    };
  }

  handleToken = async () => {
    const value = await AsyncStorage.getItem('token');
    const parsedValue = JSON.parse(value);
    const realToken = parsedValue.token;
    this.setState({
      token: realToken
    });
    this.ridesRequests();
  };

  ridesRequests = () => {
<<<<<<< HEAD
    console.log('bout to get some rides')
    const { token } = this.state;
    this.setState({ isLoading: true });
    API.getRides(token)
      .then(res => {
        const rides = res.rides;
        const scheduledRides = rides.filter(
          ride => ride.status === 'scheduled'
=======
    const { token } = this.state;
    this.setState({ isLoading: true });
    API.getDriver(token)
    .then((result) => {
      const driverId = result.driver.id;
     // console.log('driver id from getDriver', driverId);
      API.getRides(token)
      .then((result) => {
        const rides = result.rides;
        const myRides = rides.filter(
          ride => ride.driver_id === driverId, 
        );
        const scheduledRides = myRides.filter(
          ride => ride.status === 'scheduled' //|| ride.status === 'picking-up'
>>>>>>> fixed warning
        );
        const approvedRides = rides.filter(
          ride => ride.status === 'approved'
        );
<<<<<<< HEAD
        //console.log("all rides", rides);
        // console.log("scheduled", scheduledRides);
        // console.log("approved", approvedRides);
        this.setState({
=======
         this.setState({
>>>>>>> fixed warning
          scheduledRides,
          approvedRides,
          isLoading: false
        });
<<<<<<< HEAD
      })
      .catch(err => {
        console.log(err);
      });
  };

  // componentDidMount = () => {

  // this.handleToken();
  //   console.log('Update in MAIN TEST');
  // };
=======
      //  console.log(scheduledRides);
      })
    }).catch((err) => {
      console.log('request ride err',err);
    });
  };
>>>>>>> fixed warning

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
    const riderId = item.rider_id;
<<<<<<< HEAD
=======
    const rideId = item.id;
    console.log('upcoming rideID', rideId);
    console.log('upcoming token', token);
>>>>>>> fixed warning
    const date = item.pick_up_time;
    const startLocation = [
      item.start_location.street,
      item.start_location.city,
      item.start_location.state
    ];
    const endLocation = [
      item.end_location.street,
      item.end_location.city,
      item.end_location.state
    ];
    const reason = item.reason;
    return (
      <UpcomingRideCard
        key={item.driver_id}
        onPress={() => {
          navigation.navigate('RideView', {
            riderId,
<<<<<<< HEAD
            //  rideId,
=======
            rideId,
>>>>>>> fixed warning
            token,
            startLocation,
            endLocation,
            date,
            reason,
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
<<<<<<< HEAD
=======
    console.log('render upcomming', scheduledRides);
>>>>>>> fixed warning
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
<<<<<<< HEAD
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
=======
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
>>>>>>> fixed warning
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
    const riderId = item.rider_id;
    const rideId = item.id;
    const date = item.pick_up_time;

    const name = item.riderName;
    const reason = item.reason;
    return (
      <RequestedRideCard
        key={item.driver_id}
        onPress={() => {
          navigation.navigate('RequestedRidesDetails', {
            riderId,
            rideId,
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
      <SafeAreaView>
        <View style={styles.titlesContainer}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.subTitle}>Requested Rides</Text>
          </View>
        </View>
        <View style={styles.seperator} />
<<<<<<< HEAD
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
=======
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
>>>>>>> fixed warning
      </SafeAreaView>
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
<<<<<<< HEAD
    navigation.navigate('DriverScheduleView', { scheduledRides });
=======
    const { token } = this.state;
    console.log('in navigate to driver', scheduledRides);
    // const token = navigation.getParam('token');
    console.log('navigate token', token);
    navigation.navigate('DriverScheduleView', { scheduledRides , token});
>>>>>>> fixed warning
  };

  render() {
    const { isLoading } = this.state;

    return (

      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.handleToken()} />
        <StatusBar barStyle="light-content" backgroundColor="#1EAA70" />
        <Header onPress={this.navigateToSettings} />
        {isLoading ? (
          this.renderLoader()
        ) : (
            <ScrollView
              scrollsToTop
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: variables.sizes.padding }}
            >
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
