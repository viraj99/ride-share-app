import React from 'react';
import { View, FlatList } from 'react-native';
import { RideListItem } from '../../components/RideListItem';

const DriverScheduleView = (props) => {
  const { navigation } = props;
  const scheduledRides = navigation.getParam('scheduledRides');

  keyExtractor = item => item.id.toString();

  navigateToRideView = () => {
    navigation.navigate('RideView');
  };

  renderRideList = ({ item, index }) => {
    const name = item.riderName;
    const date = item.pickupTime;
    const time = item.pickupTime;
    const address = `At ${item.pickupLocation.street_address}`;

    const underlayColor = '#FFF';
    return (
      <RideListItem
        name={name}
        date={date}
        time={time}
        address={address}
        underlayColor={underlayColor}
        onPress={this.navigateToRideView}
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
