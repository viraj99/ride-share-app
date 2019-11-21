import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, ThemeConsumer } from 'react-native-elements';

import { InitOverviewCard } from '../../components/Card';
import styles from './styles';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';


export default class RequestedRidesDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Accept Ride',
      isLoading: true,
    };
  }
  ////////////////////////////////
  componentDidMount = () => {
    // console.log('inside component did mount');
    this.requestRider();

  }

  requestRider = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const id = navigation.getParam('id');
    // console.log('token', token);
    // console.log('id', id);
    API.getRider(id, token)
      .then(res => {
        // console.log('res', res);
        this.setState({
          firstName: res.json.rider.first_name,
          lastName: res.json.rider.last_name,
          isLoading: false,
        });
        // console.log('lastName', this.state.lastName);
        // console.log('firstName', this.state.firstName);
      })
      .catch(err => {
        console.log(err);
      })
  }

  acceptingRide = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const id = navigation.getParam('id');

    API.acceptRide(id, token)
      .then(res => {
        console.log('after accept', res)
        navigation.navigate('MainView')
      })
  }
  ///////////////////////////////////
  onPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const id = navigation.getParam('id');
    console.log('ONPRESS')
    Alert.alert('Want to accept this ride?', '', [
      { text: 'cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          this.acceptingRide();
          console.warn('ride confirmed');
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
    // const name = navigation.getParam('name');
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
            raised
          />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
