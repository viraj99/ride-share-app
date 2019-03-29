import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import Touch from '../../utils/Touch';
import styles from './styles';

const RideListItem = ({
  name,
  date,
  time,
  address,
  onPress,
  onLongPress,
  style,
  underlayColor,
  pickupLocation,
  dropoffLocation,
}) => (
  <Touch
    onPress={onPress}
    underlayColor={underlayColor}
    onLongPress={onLongPress}
    style={styles.button}
  >
    <View style={[styles.container]}>
      <View style={[styles.dateContainer]}>
        <Text style={[styles.date, { fontWeight: '600' }]}>{moment(date).format('D')}</Text>
        <Text style={styles.date}>{moment(date).format('MMM')}</Text>
      </View>
      <View style={styles.verticalSepartor} />
      <View style={styles.textContainer}>
        <Text style={styles.time}>{moment(time).format('h:mm A')}</Text>
        {address && <Text style={styles.address}>{address}</Text>}
        {pickupLocation && dropoffLocation && (
          <Text style={styles.location}>
            {pickupLocation}
            {' → '}
            {dropoffLocation}
          </Text>
        )}
        <View style={styles.dashedSeparator} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  </Touch>
);

export default RideListItem;
