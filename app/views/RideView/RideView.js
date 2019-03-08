import React from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';

import {
  Avatar, Button, Icon, Divider, Slider,
} from 'react-native-elements';

import styles from './styles';

const RideView = () => (
  <View style={styles.container}>
    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        }}
      />
      <Text style={styles.nameText}>John Doe</Text>
      <TouchableOpacity onPress={() => console.log('hello')}>
        <Icon raised name="phone" size={15} />
      </TouchableOpacity>
    </View>

    <View style={{ flex: 2 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.nameText}>Pick up John</Text>
        <Icon raised name="navigation" size={15} color="#517fa4" />
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
        <Text style={styles.nameText}>123 Breir St</Text>
      </View>

      <Text style={styles.nameText}>Drop off John</Text>
      <Text style={styles.nameText}>123 Breir St</Text>
    </View>

    <Button
      title="Start Ride"
      raised
      titleStyle={{ fontSize: 22, fontWeight: '600' }}
      buttonStyle={styles.startButton}
    />
    <Divider style={{ height: 10 }} />
    <Button
      title="Cancel"
      raised
      titleStyle={{ fontSize: 22, fontWeight: '600' }}
      buttonStyle={styles.cancelButton}
    />
    <View style={styles.footer} />
  </View>
);

export default RideView;
