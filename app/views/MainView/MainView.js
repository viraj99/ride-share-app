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
    ridesData: [],
  };

  ridesRequests = () => {
    API.getRides()
      .then((res) => {
        this.setState({
          ridesData: res,
        });
        console.log(res);
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
    const { ridesData } = this.state;
    const card = ridesData.map(item => (
      <RequestedRideCard
        key={item.id}
        onPress={this.navigateToDetails}
        name={item.riderName}
        date={item.pickupTime}
        pickupLocation={item.pickupLocation.city}
        dropoffLocation={item.dropoffLocation.city}
      />
    ));
    return card;
  };

  renderUpcomingSchedule = () => {
    const { ridesData } = this.state;
    const card = ridesData.map(item => (
      <UpcomingRideCard
        key={item.id}
        onPress={this.navigateToRideView}
        name={item.riderName}
        date={item.pickupTime}
        location={item.pickupLocation.street_address}
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
            {this.renderUpcomingSchedule()}
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
