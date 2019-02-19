import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';

import { Header } from '../components/Header';
import { UpcomingRideCard, RequestedRideCard } from '../components/Card';
import { CalendarButton } from '../components/Button';

type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
// should I change scrollview for flatlist?
// I could add a button inside scrollview to show more listings in sep screen
export default class MainView extends Component<Props> {
  handlePress = () => {
    console.log('pressed');
  };

  render() {
    return (
      <View style={styles.container}>
        <Header onPress={this.handlePress} />
        <ScrollView horizontal>
          <UpcomingRideCard />
          <UpcomingRideCard />
          <UpcomingRideCard />
          <UpcomingRideCard />
        </ScrollView>

        <ScrollView>
          <RequestedRideCard />
          <RequestedRideCard />
          <RequestedRideCard />
          <RequestedRideCard />
        </ScrollView>

        <View style={styles.footer}>
          <CalendarButton onPress={this.handlePress} title="CALENDAR" />
        </View>
      </View>
    );
  }
}
