import React, { Component } from 'react';
import {
  Alert, Text, View, TouchableOpacity,
} from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

import { InitOverviewCard, RideOverviewCard } from '../../components/Card';
import styles from './styles';

export default class RideView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Start Ride',
    };
  }

  onCancelPress = () => {
    Alert.alert('Cancel this ride?', '', [
      { text: "Don't cancel", onPress: () => console.warn("Don't cancel"), style: 'cancel' },
      { text: 'Yes, cancel this ride', onPress: () => console.warn('Yes, cancel this ride') },
    ]);
  };

  onPress = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;

    if (textValue === 'Start Ride') {
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
        { text: 'cancel', onPress: () => console.warn('cancel'), style: 'cancel' },
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
        { text: 'cancel', onPress: () => console.warn('cancel'), style: 'cancel' },
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
        { text: 'cancel', onPress: () => console.warn('cancel'), style: 'cancel' },
      ]);
    }
  };

  renderOverview = () => {
    const { textValue } = this.state;
    if (textValue === 'Tap to arrive') {
      return (
        <RideOverviewCard
          title="Pick up"
          address="12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1, Cairo, GA 30000"
        />
      );
    }
    if (textValue === 'Drop off') {
      return (
        <RideOverviewCard
          title="Drop off"
          address="12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1, Cairo, GA 30000"
        />
      );
    }

    return (
      <InitOverviewCard
        pickupAddress="12399 SE Really Long Street Name for Test Purposes Frwy NW Unit 1, Cairo, GA 30000"
        dropoffAddress="12399 SE Really Long Street Name for Test Purposes Frwy NW Unit 1, Cairo, GA 30000"
      />
    );
  };

  render() {
    const { textValue } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            containerStyle={styles.avatarContainer}
          />
          <Text numberOfLines={3} style={styles.nameText}>
            Hubert Blaine De la Forencia
          </Text>
        </View>
        {this.renderOverview()}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.onCancelPress}>
            <Icon name="close" size={20} color="#475c67" reverse raised type="material-community" />
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
