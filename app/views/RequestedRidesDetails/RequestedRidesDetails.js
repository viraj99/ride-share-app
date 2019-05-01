import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

import { InitOverviewCard } from '../../components/Card';
import styles from './styles';

export default class RequestedRidesDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Accept Ride',
    };
  }

  onPress = () => {
    Alert.alert('Want to accept this ride?', '', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          console.warn('ride confirmed');
        },
      },
    ]);
  };

  render() {
    const { textValue } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text numberOfLines={3} style={styles.nameText}>
            Hubert Blaine De la Forencia
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Text style={styles.dateText}>Feb 7th</Text>
            <Text style={styles.dateText}>at</Text>
            <Text style={styles.dateText}>6:00 PM</Text>
          </View>
        </View>

        <InitOverviewCard
          pickupAddress="12399 SE Really Long Street Name for Test Purposes Frwy NW Unit 1, Cairo, GA 30000"
          dropoffAddress="12399 SE Really Long Street Name for Test Purposes Frwy NW Unit 1, Cairo, GA 30000"
        />
        <View style={styles.buttonsContainer}>
          <Button
            title={textValue}
            containerStyle={styles.startRideContainer}
            titleStyle={styles.startRideTitle}
            buttonStyle={styles.startRideButton}
            onPress={this.onPress}
            raised
          />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
