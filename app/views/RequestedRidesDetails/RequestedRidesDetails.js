<<<<<<< HEAD
/* eslint-disable prettier/prettier */
=======
>>>>>>> fixed warning
import React, { Component, useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, ThemeConsumer } from 'react-native-elements';

import { InitOverviewCard } from '../../components/Card';
import styles from './styles';
import API from '../../api/api';
//? import AsyncStorage from '@react-native-community/async-storage';

export default class RequestedRidesDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Accept Ride',
      err: '',
      isLoading: true,
    };
  }
  ////////////////////////////////
  componentDidMount = () => {
    console.log('inside component did mount');
    this.requestRider();
    this.requestRide();
  };

  requestRide = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    API.getRides(token)
      .then((result) => {
        //    console.log('request Ride', result);
        let ride_id = result.rides.rides.id;
        console.log('ride id', ride_id);
      }).catch((err) => {
        console.log('request ride', err);
      });
  }

  requestRider = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const riderId = navigation.getParam('riderId');
    //! console.log('token', token);
    //! console.log('riderId', riderId);
    API.getRider(riderId, token)
      .then(res => {
        console.log('res', res);
        this.setState({
          firstName: res.json.rider.first_name,
          lastName: res.json.rider.last_name,
          isLoading: false,
        });
        //! console.log('lastName', this.state.lastName);
        //! console.log('firstName', this.state.firstName);
      })
      .catch(err => {
        console.log(err);
      });;
  };

  acceptingRide = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');
    API.acceptRide(rideId, token)
      .then((result) => {
        Alert.alert('Ride Confirmed')
        console.log('rideId from props', rideId);
        console.log('accept API call', result);
        navigation.navigate('MainView');
      }).catch((_err) => {
        Alert.alert('Did not confirm ride')
        console.log('DIDNT WORK in API call');
        console.log('rideId from props', rideId);
      });
    // useEffect(() => {
    //   navigation.navigate('MainView');
    // });
  }
  //!-------------------------------------------
  onPress = () => {
    // const { navigation } = this.props;
    // const token = navigation.getParam('token');
    // const id = navigation.getParam('id');
    console.log('ONPRESS');
    Alert.alert('Want to accept this ride?', '', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          this.acceptingRide();
          // console.warn('ride confirmed');
          // navigation.navigate('MainView');
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
    const reason = navigation.getParam('reason');
    //? const name = navigation.getParam('name');
    //TODO const err = textValue;
    // if (this.state.err.length > 0) {
    //   this.setState.err = 'NOT Authorized';
    // }
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text numberOfLines={3} style={styles.nameText}>
            Picking up:
          </Text>
          <Text numberOfLines={3} style={styles.nameText}>
            {this.state.firstName} {this.state.lastName}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <InitOverviewCard
            pickupAddress={startLocation.join(', ')}
            dropoffAddress={endLocation.join(', ')}
            date={date}
            note={reason}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title={textValue}
            containerStyle={styles.startRideContainer}
            titleStyle={styles.startRideTitle}
            buttonStyle={styles.startRideButton}
            onPress={this.onPress}
            // TODO-- err={err}
            raised
          />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
