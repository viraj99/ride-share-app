import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import Badge from '../../Badge';
import Block from '../../Block';
import { StartButton } from '../../Button';
import styles from './styles';

const UpcomingRideCard = ({
  onPress,
  date,
  pickupLocation,
  dropoffLocation
}) => (
  <View style={[styles.card, styles.shadow]}>
    <Block row space="evenly">
      <Text style={styles.date}>{moment.parseZone(date).format('MMMM D')}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.date}>{moment.parseZone(date).format('h:mm A')}</Text>
    </Block>
    <Block color="gray3" style={styles.hLine} />
    <Block row center>
      <Badge color="rgba(30,170,112,0.2)" size={14} style={{ marginRight: 8 }}>
        <Badge color="#3a556a" size={8} />
      </Badge>
      <Text style={styles.location}>{pickupLocation}</Text>
    </Block>
    <Block row center style={{ paddingVertical: 4 }}>
      <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
    </Block>
    <Block row center>
      <Badge
        color="rgba(255, 71, 87, 0.2)"
        size={14}
        style={{ marginRight: 8 }}
      >
        <Badge color="#FF4957" size={8} />
      </Badge>
      <Text spacing={0.5} style={styles.location}>
        {dropoffLocation}
      </Text>
    </Block>
    <Block row center style={{ marginTop: 16 }}>
      <StartButton onPress={onPress} title="Start" />
    </Block>
  </View>
);

export default UpcomingRideCard;
