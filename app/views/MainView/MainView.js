import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Header } from '../../components/Header';
import { UpcomingRideCard, RequestedRideCard } from '../../components/Card';
import { CalendarButton } from '../../components/Button';
import styles from './styles';
import API from '../../api/api';

type Props = {};

export default class MainView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      scheduledRides: [],
      approvedRides: [],
      loading: false,
    };
  }

  ridesRequests = () => {
    this.setState({ loading: true });
    API.getScheduledRides()
      .then((res) => {
        this.setState({
          scheduledRides: res,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    API.getApprovedRides()
      .then((res) => {
        this.setState({
          approvedRides: res,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.ridesRequests();
  };

  renderLoader = () => {
    const { loading } = this.state;
    if (!loading) return null;

    return (
      <View style={styles.loader}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderRequestedRides = () => {
    const { approvedRides } = this.state;
    const card = approvedRides.map(item => (
      <RequestedRideCard
        key={item.id}
        onPress={this.navigateToDetails}
        name={item.riderName}
        date={item.pickupTime}
        pickupLocation={item.pickupLocation.city}
        dropoffLocation={item.dropoffLocation.city}
      />
    ));
    const numRides = approvedRides.length;
    const seeAll = `See All (${numRides})`;

    if (numRides > 0) {
      return (
        <View style={{ flex: 2 }}>
          <View style={styles.titlesContainer}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={styles.subTitle}>Open Requested Rides</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={this.navigateToRidesRequested}>
                <Text style={styles.seeAllText}>{seeAll}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperator} />
          <ScrollView>{card}</ScrollView>
        </View>
      );
    }

    return (
      <View style={{ flex: 2 }}>
        <View style={styles.titlesContainer}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.subTitle}>Open Requested Rides</Text>
          </View>
        </View>
        <View style={styles.seperator} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.regText}>No found rides at the moment.</Text>
        </View>
      </View>
    );
  };

  renderUpcomingSchedule = () => {
    const { scheduledRides } = this.state;
    const card = scheduledRides.map(item => (
      <UpcomingRideCard
        key={item.id}
        onPress={this.navigateToRideView}
        name={item.riderName}
        date={item.pickupTime}
        location={item.pickupLocation.street_address}
      />
    ));

    if (scheduledRides.length > 0) {
      return (
        <View style={{ flex: 2 }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.subTitle}>Upcoming Schedule</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {card}
            <View style={styles.viewMoreContainer}>
              <TouchableOpacity onPress={this.navigateToDriverSchedule}>
                <Text style={styles.regText}>View More</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.subTitle}>Upcoming Schedule</Text>
        <View style={styles.spacer}>
          <Text style={styles.regText}>You have no scheduled rides at the moment.</Text>
        </View>
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

  navigateToRideView = () => {
    const { navigation } = this.props;
    navigation.navigate('RideView');
  };

  navigateToDriverSchedule = () => {
    // takes me to ALL schedules rides
    const { scheduledRides } = this.state;
    const { navigation } = this.props;
    navigation.navigate('DriverScheduleView', { scheduledRides });
  };

  navigateToRidesRequested = () => {
    // takes me to ALL approved rides
    const { approvedRides } = this.state;
    const { navigation } = this.props;
    navigation.navigate('RidesRequested', { approvedRides });
  };

  navigateToDetails = () => {
    const { navigation } = this.props;
    navigation.navigate('RequestedRidesDetails');
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1EAA70" />
        <Header onPress={this.navigateToSettings} />
        {loading ? (
          this.renderLoader()
        ) : (
          <View style={{ flex: 1 }}>
            {this.renderUpcomingSchedule()}
            {this.renderRequestedRides()}
          </View>
        )}
        <View style={styles.footer}>
          <CalendarButton onPress={this.navigateToCalendar} title="CALENDAR" />
        </View>
      </View>
    );
  }
}
