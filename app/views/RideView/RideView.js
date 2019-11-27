import React, {Component} from 'react';
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import {Avatar, Button, Icon} from 'react-native-elements';
import {Popup} from 'react-native-map-link';

import {InitOverviewCard, RideOverviewCard} from '../../components/Card';
import Block from '../../components/Block';
import styles from './styles';

const data = [
  {
    pickupLocation: {
      latitude: 35.980656,
      longitude: -78.898274,
    },
    dropOffLocation: {
      latitude: 36.00272,
      longitude: -78.902597,
    },
  },
];
export default class RideView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Go to pickup',
      isVisible: false,
      latitude: 0,
      longitude: 0,
    };
  }

  handlePickUpDirections = () => {
    const latitude = data.map(item => item.pickupLocation.latitude);
    const longitude = data.map(item => item.pickupLocation.longitude);
    this.setState({
      isVisible: true,
      latitude,
      longitude,
    });
  };

  handleDropOffDirections = () => {
    const latitude = data.map(item => item.dropOffLocation.latitude);
    const longitude = data.map(item => item.dropOffLocation.longitude);
    this.setState({
      isVisible: true,
      latitude,
      longitude,
    });
  };

  onCancelPress = () => {
    Alert.alert('Cancel this ride?', '', [
      {text: "Don't cancel", style: 'cancel'},
      {
        text: 'Yes, cancel this ride',
        onPress: () => console.warn('ride cancelled'),
      },
    ]);
  };

  onPress = () => {
    const {textValue} = this.state;
    const {navigation} = this.props;

    if (textValue === 'Go to pickup') {
      this.setState({
        textValue: 'Tap to arrive',
      });
    } else if (textValue === 'Tap to arrive') {
      Alert.alert('Have you arrived?', '', [
        {
          text: 'Confirm arrival',
          onPress: () => {
            this.setState({
              textValue: 'Pick up',
            });
          },
        },
        {text: 'cancel', style: 'cancel'},
      ]);
    } else if (textValue === 'Pick up') {
      Alert.alert('Tap to confirm', '', [
        {
          text: 'Confirm pick up',
          onPress: () => {
            this.setState({
              textValue: 'Drop off',
            });
          },
        },
        {text: 'cancel', style: 'cancel'},
      ]);
    } else if (textValue === 'Drop off') {
      Alert.alert('Did you drop-off?', '', [
        {
          text: 'Confirm drop-off',
          onPress: () => {
            this.setState({
              textValue: '',
            });
            alert('ride complete');
            navigation.navigate('MainView');
          },
        },
        {text: 'cancel', style: 'cancel'},
      ]);
    }
  };

  renderOverview = () => {
    const {textValue} = this.state;
    const {navigation} = this.props;
    const startLocation = navigation.getParam('startLocation');
    const endLocation = navigation.getParam('endLocation');
    const date = navigation.getParam('date');
    if (textValue === 'Tap to arrive') {
      return (
        <RideOverviewCard
          title="Pick up"
          address={startLocation.join(', ')}
          onPress={this.handlePickUpDirections}
        />
      );
    }
    if (textValue === 'Drop off') {
      return (
        <RideOverviewCard
          title="Drop off"
          address={endLocation.join(', ')}
          onPress={this.handleDropOffDirections}
        />
      );
    }

    return (
      <InitOverviewCard
        pickupAddress={startLocation.join(', ')}
        dropoffAddress={endLocation.join(', ')}
        date={date}
      />
    );
  };

  render() {
    const {textValue, isVisible, latitude, longitude} = this.state;
    const {navigation} = this.props;
    const name = navigation.getParam('name');

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Block center style={{marginTop: 10}}>
            <Avatar
              size="large"
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              containerStyle={styles.avatarContainer}
            />
          </Block>
          <Block center space="evenly">
            <Text numberOfLines={3} style={styles.nameText}>
              James Wilkinson
            </Text>
          </Block>
        </View>
        <View style={{flex: 3}}>
          <Popup
            isVisible={isVisible}
            onCancelPressed={() => this.setState({isVisible: false})}
            onAppPressed={() => this.setState({isVisible: false})}
            onBackButtonPressed={() => this.setState({isVisible: false})}
            appsWhiteList={[
              'apple-maps',
              'google-maps',
              'citymapper',
              'transit',
              'waze',
              'yandex',
              'moovit',
              'yandex-maps',
            ]}
            modalProps={{animationIn: 'slideInUp'}}
            options={{
              latitude,
              longitude,
              // sourceLatitude: 35.995616, optionally specify starting location for directions
              // sourceLongitude: -78.902208, not optional if sourceLatitude is specified
            }}
          />
          {this.renderOverview()}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.onCancelPress}>
            <Icon
              name="close"
              size={20}
              color="#475c67"
              reverse
              raised
              type="material-community"
            />
          </TouchableOpacity>
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
