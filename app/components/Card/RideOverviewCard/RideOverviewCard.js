import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const RideOverviewCard = ({ onPress, title, address }) => (
  <View style={[styles.overviewContainer, styles.shadow]}>
    <Text style={styles.locationText}>{title}</Text>
    <Text numberOfLines={2} style={styles.statusTitle}>
      {address}
    </Text>
    <TouchableOpacity onPress={onPress}>
      <Icon
        name="navigation"
        raised
        reverse
        type="material-community"
        color="#ff8262"
        size={32}
      />
    </TouchableOpacity>
  </View>
);

export default RideOverviewCard;
