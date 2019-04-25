import React from 'react';
import { View, FlatList } from 'react-native';
import { RideListItem } from '../../components/RideListItem';

const RidesRequestedView = (props) => {
  const { navigation } = props;
  const approvedRides = navigation.getParam('approvedRides');

  keyExtractor = item => item.driver_id.toString();

  navigateToDetails = () => {
    navigation.navigate('RequestedRidesDetails');
  };

  renderRideList = ({ item, index }) => {
    const name = item.riderName;
    const date = item.pick_up_time;
    const time = item.pick_up_time;
    const pickupLocation = item.start_location.city;
    const dropoffLocation = item.end_location.city;

    const underlayColor = '#FFF';
    return (
      <RideListItem
        name={name}
        date={date}
        time={time}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        underlayColor={underlayColor}
        onPress={this.navigateToDetails}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcf6' }}>
      <FlatList
        data={approvedRides}
        renderItem={this.renderRideList}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );
};

export default RidesRequestedView;
