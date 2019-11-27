import React from 'react';
import { View, FlatList } from 'react-native';
import { RideListItem } from '../../components/RideListItem';

const DriverScheduleView = props => {
  const { navigation } = props;
  const scheduledRides = navigation.getParam('scheduledRides');
  console.log('scheduledRides', scheduledRides);

  keyExtractor = item => {
    return item.id.toString();
  }

  console.log('keyExtractor item:', keyExtractor);
  navigateToRideView = (item) => {
    console.log('click on schedule', item);
    const date = item.pick_up_time;
    const reason = item.reason;
    const riderId = item.rider_id;
    const startLocation = [
      item.start_location.street,
      item.start_location.city,
      item.start_location.state,
    ];
    const endLocation = [
      item.end_location.street,
      item.end_location.city,
      item.end_location.state,
    ];

    navigation.navigate('RideView', {
      startLocation,
      endLocation,
      reason,
      riderId,
      date,
    });
  };

  renderRideList = ({ item, index }) => {
    const name = item.riderName;
    const date = item.pick_up_time;
    const time = item.pick_up_time;
    const address = `At ${item.start_location.street}`;

    const underlayColor = '#FFF';
    return (
      <RideListItem
        name={name}
        date={date}
        time={time}
        address={address}
        underlayColor={underlayColor}
        onPress={() => this.navigateToRideView(item)}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcf6' }}>
      <FlatList
        data={scheduledRides}
        renderItem={this.renderRideList}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );
};

export default DriverScheduleView;
