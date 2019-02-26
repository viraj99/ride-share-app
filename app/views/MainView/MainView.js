import React, { Component } from 'react';
import {
  Text, View, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';

import { Header } from '../../components/Header';
import { UpcomingRideCard, RequestedRideCard } from '../../components/Card';
import { CalendarButton } from '../../components/Button';
import styles from './styles';
import API from '../../api/api';

type Props = {};

export default class MainView extends Component<Props> {
  state = {
    rideData: [],
  };

  ridesRequests = () => {
    API.getRides()
      .then((res) => {
        this.setState({
          rideData: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.ridesRequests();
  };

  navigateToSettings = () => {
    const { navigation } = this.props;
    navigation.navigate('RideView');
  };

  navigateToCalendar = () => {
    const { navigation } = this.props;
    navigation.navigate('AgendaView');
  };

  navigateToRideView = () => {
    const { navigation } = this.props;
    navigation.navigate('RideView');
  };

  navigateToDriverSchedule = () => {
    const { navigation } = this.props;
    navigation.navigate('DriverScheduleView');
  };

  navigateToRidesRequested = () => {
    const { navigation } = this.props;
    navigation.navigate('RidesRequested');
  };

  navigateToDetails = () => {
    const { navigation } = this.props;
    navigation.navigate('RequestedRidesDetails');
  };

  renderRequestedRides = () => {
    const { rideData } = this.state;
    const card = rideData.map(item => (
      <RequestedRideCard
        key={item.ride_id}
        onPress={this.navigateToDetails}
        name={item.passenger.first_name}
      />
    ));

    return card;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header onPress={this.navigateToSettings} />

        <View style={{ flex: 2 }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.subTitle}>Upcoming Schedule</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <UpcomingRideCard onPress={this.navigateToRideView} />
            <UpcomingRideCard />
            <UpcomingRideCard />
            <UpcomingRideCard />

            <View style={styles.viewMoreContainer}>
              <TouchableOpacity onPress={this.navigateToDriverSchedule}>
                <Text style={styles.regText}>View More</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={{ flex: 2 }}>
          <View style={styles.titlesContainer}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.subTitle}>Open Requested Rides</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={this.navigateToRidesRequested}>
                <Text style={styles.seeAllText}>See All (5)</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperator} />
          <ScrollView>{this.renderRequestedRides()}</ScrollView>
        </View>

        <View style={styles.footer}>
          <CalendarButton onPress={this.navigateToCalendar} title="CALENDAR" />
        </View>
      </View>
    );
  }
}
