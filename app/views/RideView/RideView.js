import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Platform,
} from 'react-native';

import {
  Avatar, Button, Icon, Divider,
} from 'react-native-elements';
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
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : 10,
          }}
        >
          <Avatar
            size="large"
            rounded
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            containerStyle={{ borderWidth: 3, borderColor: '#475c67' }}
          />
          <Text style={styles.nameText}>John Doe</Text>
          <TouchableOpacity onPress={() => console.log('phone ringing')}>
            <Icon raised name="phone" size={15} reverse color="#475c67" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#fff',
            marginHorizontal: 16,
            marginBottom: 16,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          }}
        >
          <View
            style={{
              width: '15%',
              justifyContent: 'space-around',
            }}
          >
            <Icon name="dot-circle-o" type="font-awesome" color="#475c67" />
            <Icon name="circle-small" type="material-community" color="#475c67" />
            <Icon name="circle-small" type="material-community" color="#475c67" />
            <Icon name="circle-small" type="material-community" color="#475c67" />
            <Icon name="place" type="material" color="#475c67" />
          </View>
          <View
            style={{
              width: '65%',
              justifyContent: 'space-around',
            }}
          >
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
              <Text style={styles.locationText}>123 Breir St</Text>
            </View>
          </View>
          <View
            style={{
              width: '15%',
              justifyContent: 'space-around',
            }}
          >
            <Icon
              name="navigation"
              raised
              reverse
              type="material-community"
              color="#475c67"
              size={20}
            />
            <Icon
              name="navigation"
              raised
              reverse
              type="material-community"
              color="#475c67"
              size={20}
            />
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
