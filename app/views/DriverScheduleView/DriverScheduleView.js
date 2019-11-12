import React from 'react';
import {View, FlatList} from 'react-native';
import {RideListItem} from '../../components/RideListItem';

const DriverScheduleView = props => {
  const {navigation} = props;
  const scheduledRides = navigation.getParam('scheduledRides');
  keyExtractor = item => item.id.toString();

  navigateToRideView = () => {
    // this is currently just dummy data to show
    // how you can pass in the data to the ride view
    const date = 'hard coded time';
    const startLocation = ['street', 'city', 'state'];
    const endLocation = ['street', 'city', 'state'];

    navigation.navigate('RideView', {
      startLocation,
      endLocation,
      date,
    });
  };

  renderRideList = ({item, index}) => {
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
        onPress={this.navigateToRideView}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fcfcf6'}}>
      <FlatList
        data={scheduledRides}
        renderItem={this.renderRideList}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );
};

export default DriverScheduleView;
