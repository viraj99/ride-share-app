import React, { Component } from 'react';
import {
  Text, View, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';

import { Header } from '../../components/Header';
import { UpcomingRideCard, RequestedRideCard } from '../../components/Card';
import { CalendarButton } from '../../components/Button';
import styles from './styles';

type Props = {};

export default class MainView extends Component<Props> {
  handlePress = () => {
    console.log('pressed');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header onPress={this.handlePress} />

        <View style={{ flex: 2 }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.subTitle}>Upcoming Schedule</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <UpcomingRideCard />
            <UpcomingRideCard />
            <UpcomingRideCard />
            <UpcomingRideCard />

            <View style={styles.viewMoreContainer}>
              <TouchableOpacity>
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
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All (5)</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperator} />
          <ScrollView>
            <RequestedRideCard name="Amira Wahas" />
            <RequestedRideCard name="Andrea Hernandez" />
            <RequestedRideCard name="Diego Cooper" />
            <RequestedRideCard name="John Doe" />
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <CalendarButton onPress={this.handlePress} title="CALENDAR" />
        </View>
      </View>
    );
  }
}
