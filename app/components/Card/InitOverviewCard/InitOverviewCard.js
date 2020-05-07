import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import Badge from '../../Badge';
import Block from '../../Block';
import styles from './styles';

// vars below will be used to open maps to check direction but does not start navigation
// const handlePickup = { latitude: pickupLat, longitude: pickupLong, query: 'Pickup Spot' };
// const openYosemite = createOpenLink(handlePickup);
const InitOverviewCard = ({
  onPress,
  pickupAddress,
  dropoffAddress,
  date,
  note,
  pickup_to_dropoff,
  pickup_to_dropoff_time
}) => (
  <Block>
    <Block style={[styles.cardContainer, styles.shadow]}>
      <Block row space="between">
        <Text style={styles.date}>{moment(date).format('MMM D')}</Text>
        {console.log('data from date raw: ', date)}
        {console.log('data from date MMM D: ', moment(date).format('MMM D'))}
        <Text style={styles.date}>pick up by</Text>
        {console.log('data from date hh:mm ', moment.utc(date).format('hh:mm'))}
        <Text style={styles.date}>{moment.utc(date).format('hh:mm')}</Text>
      </Block>
      <Block row center>
        <Badge
          color="rgba(30,170,112,0.2)"
          size={14}
          style={{ marginRight: 8 }}
        >
          <Badge color="#1EAA70" size={8} />
        </Badge>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.location}>
            {pickupAddress}
          </Text>
        </TouchableOpacity>
      </Block>
      <Block row center>
        <Badge
          color="rgba(255, 71, 87, 0.2)"
          size={14}
          style={{ marginRight: 8 }}
        >
          <Badge color="#FF4957" size={8} />
        </Badge>
        <TouchableOpacity>
          <Text numberOfLines={1} style={styles.location}>
            {dropoffAddress}
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>

    <View style={[styles.cardContainer, styles.noteContainer, styles.shadow]}>
      <Block style={styles.noteCard}>
        {/* <ScrollView> */}
        <Block>
          <Text style={styles.title}>Reason For Ride</Text>
          <Text style={styles.noteText}>{note}</Text>
          {pickup_to_dropoff >= 0 ? (
            <Text style={styles.noteText}>
              Distance from pickup To dropoff is approximately{' '}
              {pickup_to_dropoff} mile(s)
            </Text>
          ) : (
            <Text style={styles.noteText}>
              Approximate Distance will be displayed when you have accepted the
              Ride
            </Text>
          )}
          {pickup_to_dropoff_time >= 0 ? (
            <Text style={styles.noteText}>
              Approximate wait time is {pickup_to_dropoff_time}
            </Text>
          ) : (
            <Text style={styles.noteText}>
              Approximate wait time to be Determined
            </Text>
          )}

          {/* <Text style={styles.noteText}></Text> */}
        </Block>
        {/* </ScrollView> */}
      </Block>
    </View>
    {/* <View style={[styles.cardContainer, styles.noteContainer, styles.shadow]}>
      <Block style={styles.noteCard}>
        <ScrollView>
          <Block>
            <Text style={styles.title}>Notes For Ride</Text>
            <Text style={styles.noteText}>{note}</Text>
          </Block>
        </ScrollView>
      </Block>
    </View> */}
  </Block>
);
export default InitOverviewCard;
