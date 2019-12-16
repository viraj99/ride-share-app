/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Badge from '../../Badge';
import Block from '../../Block';
import styles from './styles';

const RequestedRidesCard = ({
  onPress,
  date,
  pickupLocation,
  dropoffLocation,
}) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress}>
        <Block row space="between" style={{ marginBottom: 16 }}>
          <Text style={styles.date}>{moment(date).format('MMM D')}</Text>
          <Text style={styles.date}>{moment(date).format('h:mm A')}</Text>
          {/*//? <Text styles={styles.name}>{name}</Text>
                                                          */}
        </Block>
        <Block row center>
          <Badge color="rgba(30,170,112,0.2)" size={14} style={{ marginRight: 8 }}>
            <Badge color="#1EAA70" size={8} />
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
            style={{ marginRight: 8 }}>
            <Badge color="#FF4957" size={8} />
          </Badge>
          <Text spacing={0.5} style={styles.location}>
            {dropoffLocation}
          </Text>
        </Block>
      </TouchableOpacity>
    </View>
  );

//? Card.propTypes = {
//?  onPress: PropTypes.func,
//? };

export default RequestedRidesCard;
