import React from 'react';
import { View, FlatList } from 'react-native';
import { RideListItem } from '../../components/RideListItem';

const RidesRequestedView = (props) => {
  const { navigation } = props;
  const approvedRides = navigation.getParam('CustomRidesData');

  keyExtractor = item => item.id.toString();

  navigateToDetails = () => {
    navigation.navigate('RequestedRidesDetails');
  };

  renderRideList = ({ item, index }) => {
    const name = item.riderName;
    const date = item.pickupTime;
    const time = item.pickupTime;
    const pickupLocation = item.pickupLocation.city;
    const dropoffLocation = item.dropoffLocation.city;

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
