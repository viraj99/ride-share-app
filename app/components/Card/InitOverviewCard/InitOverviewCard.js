import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// import PropTypes from 'prop-types';
import styles from './styles';

const InitOverviewCard = ({ onPress, pickupAddress, dropoffAddress }) => (
  <View style={styles.overviewContainer}>
    <View style={styles.overviewLeftSection} />
    <View style={styles.initialCenter}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="dot-circle-o" type="font-awesome" color="#475c67" />
        <Text style={[styles.statusTitle, { marginHorizontal: 10 }]}>Pick up</Text>
      </View>

      <Text style={styles.locationText}>{pickupAddress}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="place" type="material" color="#475c67" />
        <Text style={[styles.statusTitle, { marginHorizontal: 10 }]}>Drop off</Text>
      </View>

      <Text style={styles.locationText}>{dropoffAddress}</Text>
    </View>

    <View style={styles.overviewRightSection} />
  </View>
);

export default InitOverviewCard;
