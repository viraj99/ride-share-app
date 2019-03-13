import React, { Component } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';

import {
  Avatar, Button, Icon, Divider, Slider,
} from 'react-native-elements';
// MaterialCommunityIcons
import styles from './styles';

export default class RideView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Start Ride',
    };
  }

  onPress = () => {
    const { textValue } = this.state;

    if (textValue === 'Start Ride') {
      this.setState({
        textValue: 'Tap to arrive',
      });
    } else if (textValue === 'Tap to arrive') {
      this.setState({
        textValue: 'Pick up',
      });
    } else if (textValue === 'Pick up') {
      this.setState({
        textValue: 'Drop off',
      });
      alert('complete!');
    }
  };

  render() {
    const { textValue } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
          />
          <Text style={styles.nameText}>John Doe</Text>
          <TouchableOpacity onPress={() => console.log('phone ringing')}>
            <Icon raised name="phone" size={15} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2,
            borderColor: 'black',
            borderWidth: 2,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <View style={{ width: '20%', borderColor: 'black', borderWidth: 2 }}>
            <Icon name="dot-circle-o" type="font-awesome" />
            <Icon name="circle-small" type="material-community" />
            <Icon name="circle-small" type="material-community" />
            <Icon name="circle-small" type="material-community" />
            <Icon name="circle-small" type="material-community" />
            <Icon name="circle-small" type="material-community" />
            <Icon name="circle-small" type="material-community" />

            <Icon name="circle-small" type="material-community" />
            <Icon name="place" type="material" />
          </View>
          <View style={{ width: '80%', borderColor: 'black', borderWidth: 2 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.statusTitle}>Pick up</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                name="map-pin"
                type="font-awesome"
                size={15}
                color="#517fa4"
                containerStyle={{ paddingRight: 5 }}
              />
              <Text style={styles.locationText}>123 Breir St</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.statusTitle}>Drop off</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                name="map-pin"
                type="font-awesome"
                size={15}
                color="#517fa4"
                containerStyle={{ paddingRight: 5 }}
              />
              <Text style={styles.locationText}>123 Breir St</Text>
            </View>
          </View>
        </View>

        <Button
          title={textValue}
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          titleStyle={{ fontSize: 22, fontWeight: '600' }}
          buttonStyle={styles.startButton}
          onPress={this.onPress}
        />
        <Divider style={{ height: 5, backgroundColor: '#fcfcf6' }} />
        <Button
          title="Cancel"
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          titleStyle={{ fontSize: 22, fontWeight: '600' }}
          buttonStyle={styles.cancelButton}
        />
        <View style={styles.footer} />
      </View>
    );
  }
}
