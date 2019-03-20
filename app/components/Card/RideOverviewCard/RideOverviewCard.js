import React from 'react';
import {
  Text, View, TouchableOpacity, Animated,
} from 'react-native';
import { Icon } from 'react-native-elements';

// import PropTypes from 'prop-types';
import styles from './styles';

const RideOverviewCard = ({ onPress, title, address }) => (
  <View style={styles.overviewContainer}>
    <View style={styles.overviewLeftSection}>
      <Icon name="dot-circle-o" type="font-awesome" color="#475c67" />
      <Icon name="circle-small" type="material-community" color="#475c67" />
      <Icon name="circle-small" type="material-community" color="#475c67" />
      <Icon name="circle-small" type="material-community" color="#475c67" />
      <Icon name="place" type="material" color="#475c67" />
    </View>
    <View style={styles.overviewCenterSection}>
      <View style={styles.alignment}>
        <Text style={styles.statusTitle}>{title}</Text>
      </View>

      <View style={styles.alignment}>
        <Text numberOfLines={2} style={styles.locationText}>
          {address}
        </Text>
      </View>
    </View>
    <View style={styles.overviewRightSection}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name="navigation"
          raised
          reverse
          type="material-community"
          color="#475c67"
          size={20}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default RideOverviewCard;
