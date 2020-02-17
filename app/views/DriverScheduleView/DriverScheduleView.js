import React from 'react';
import { View, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { RideListItem } from '../../components/RideListItem';
import AsyncStorage from '@react-native-community/async-storage';
import NavFooter from '../../components/NavFooter/NavFooter';

class DriverScheduleView extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleToken = async () => {
  //   const value = await AsyncStorage.getItem('token');
  //   const parsedValue = JSON.parse(value);
  //   const realToken = parsedValue.token;
  //   this.setState({
  //     token: realToken
  //   });
  //   console.log('inside handleToken', token);
  //   this.navigateToRideView();
  // };

  // componentDidMount = () => {
  //   this.handleToken();
  // }

  navigateToRideView = (item, token) => {
    console.log('clicked on schedule', item);
    console.log('token: ', token);

    const date = item.pick_up_time;
    const reason = item.reason;
    const rideId = item.id;

    console.log('rideId in driverSchedule', rideId);
    const riderId = item.rider_id;
    const startLocation = [
      item.start_location.street,
      item.start_location.city,
      item.start_location.state
    ];
    const endLocation = [
      item.end_location.street,
      item.end_location.city,
      item.end_location.state
    ];

    navigation.navigate('RideView', {
      startLocation,
      endLocation,
      reason,
      rideId,
      riderId,
      token,
      date
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
        onPress={() => this.navigateToRideView(item, token)}
      />
    );
  };

  render() {
    const { navigation } = this.props;
    const scheduledRides = this.props.navigation.state.params.scheduledRides;
    console.log('RIDES: ', scheduledRides);
    const token = this.props.token;

    const keyExtractor = item => {
      return item.id.toString(); //&& item.token.toString();
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <NavigationEvents onDidFocus={() => this.handleToken()} /> */}
        <FlatList
          data={scheduledRides}
          renderItem={this.renderRideList}
          keyExtractor={keyExtractor}
        />

        <NavFooter
          navigation={this.props.navigation}
          token={this.props.token}
          scheduledRides={this.props.scheduledRides}
        />
      </View>
    );
  }
}

export default DriverScheduleView;
