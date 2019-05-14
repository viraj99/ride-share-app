import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

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
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const id = navigation.getParam('id');

    Alert.alert('Want to accept this ride?', '', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          // API.acceptRide();
          console.warn('ride confirmed');
          navigation.navigate('MainView');
        },
      },
    ]);
  };

  render() {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const startLocation = navigation.getParam('startLocation');
    const endLocation = navigation.getParam('endLocation');
    const date = navigation.getParam('date');
    const name = navigation.getParam('name');
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text numberOfLines={3} style={styles.nameText}>
            Picking up:
          </Text>
          <Text numberOfLines={3} style={styles.nameText}>
            Name
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <InitOverviewCard
            pickupAddress={startLocation.join(', ')}
            dropoffAddress={endLocation.join(', ')}
            date={date}
          />
        </View>

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
