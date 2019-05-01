import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import DateDisplay from '../DateDisplay/DateDisplay';
import styles from './styles';
import { Availability } from '..';


const Day = ({ data, onPress }) => {
  parseLocation = (loc) => {
    const locationStr = `${loc.street} ${loc.city}, ${loc.state} ${loc.zip}`;
    return locationStr;
  };

  renderAvailabilities = (item) => {
    const avails = item.availability;


    return avails.map((i, index) => {
      console.log(i);
      if (index === 0) {
        console.log('conditional hit', i);
        return (
          <Availability
            key={i.eventId}
            startTime={i.startTime}
            endTime={i.endTime}
            location={parseLocation(i.location)}
            iterated={false}
          />
        );
      }
      return (
        <Availability
          key={i.eventId}
          iterated
          startTime={i.startTime}
          endTime={i.endTime}
          location={parseLocation(i.location)}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <DateDisplay
        date={data.timestamp}
      />
      <View style={styles.contentContainer}>
        {data.availability ? (
          renderAvailabilities(data)) : (
            <TouchableOpacity onPress={onPress}>
              <View style={styles.textContainer}>
                <Text style={styles.emptyText}>
                  Nothing scheduled yet. Tap to add availability.
                </Text>
              </View>
            </TouchableOpacity>
        )
        }
      </View>
    </View>
  );
};

export default Day;
