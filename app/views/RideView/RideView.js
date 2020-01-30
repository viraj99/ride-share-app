import React, { Component } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Icon, ThemeProvider } from 'react-native-elements';
import { Popup } from 'react-native-map-link';
import getDirections from 'react-native-google-maps-directions';
import API from '../../api/api';
import { InitOverviewCard, RideOverviewCard } from '../../components/Card';
import Block from '../../components/Block';
import { SkipButton, CancelButton } from '../../components/Button';
import styles from './styles';

const data = [
  {
    pickupLocation: {
      latitude: 35.980656,
      longitude: -78.898274
    },
    dropOffLocation: {
      latitude: 36.00272,
      longitude: -78.902597
    }
  }
];
export default class RideView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Go to pickup',
      isVisible: false,
      latitude: 0,
      longitude: 0,
      isLoading: true
    };
  }
  componentDidMount = () => {
    this.requestRider();
  };

  requestRider = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const riderId = navigation.getParam('riderId');
    API.getRider(riderId, token).then(response => {
      this.setState({
        first: response.json.rider.first_name,
        last: response.json.rider.last_name,
        isLoading: false
      });
    });
  };
  /////////////
  // handleGetDirections = () => {
  //   // const data = [
  //   //   {
  //   //     pickupLocation: {
  //   //       latitude: 35.980656,
  //   //       longitude: -78.898274
  //   //     },
  //   //     dropOffLocation: {
  //   //       latitude: 36.00272,
  //   //       longitude: -78.902597
  //   //     }
  //   //   }
  //   // ];

  //   const data = {
  //     source: {
  //       latitude,
  //       longitude
  //     },
  //     destination: {
  //       latitude,
  //       longitude
  //     },
  //     params: [
  //       {
  //         key: 'travelmode',
  //         value: 'driving' // may be "walking", "bicycling" or "transit" as well
  //       },
  //       {
  //         key: 'dir_action',
  //         value: 'navigate' // this instantly initializes navigation using the given travel mode
  //       }
  //     ]
  //     // waypoints: [
  //     //   {
  //     //     latitude: -33.8600025,
  //     //     longitude: 18.697452
  //     //   },
  //     //   {
  //     //     latitude: -33.8600026,
  //     //     longitude: 18.697453
  //     //   },
  //     //   {
  //     //     latitude: -33.8600036,
  //     //     longitude: 18.697493
  //     //   }
  //     // ]
  //   };
  //   const latitude = data.map(item => item.pickupLocation.latitude);
  //   const longitude = data.map(item => item.pickupLocation.longitude);
  //   getDirections(data);
  // };
  //////////////////
  handlePickUpDirections = () => {
    const latitude = data.map(item => item.pickupLocation.latitude);
    const longitude = data.map(item => item.pickupLocation.longitude);
    console.log('RideView PickUp', latitude, ' & ', longitude);
    this.setState({
      isVisible: true,
      latitude,
      longitude
    });
  };

  handleDropOffDirections = () => {
    const latitude = data.map(item => item.dropOffLocation.latitude);
    const longitude = data.map(item => item.dropOffLocation.longitude);
    console.log('RideView Drop Off', latitude, ' & ', longitude);
    this.setState({
      isVisible: true,
      latitude,
      longitude
    });
  };
  onPickUpPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');
    API.pickUpRide(rideId, token)
      .then(result => {
        // Alert.alert('Picking Up');
        // console.log('pick up rideId', rideId);
        // console.log('pick up token', token);
        // console.log('result', result);
      })
      .catch(err => {
        Alert.alert('Unable to PickUp');
        console.log('err pick up rideId', rideId);
        console.log('err pick up token', token);
        console.log(err, 'result', result);
      });
  };
  onDropOffPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    API.dropOffRide(rideId, token)
      .then(result => {
        // Alert.alert('Dropping Off');
        console.log('drop off rideId', rideId);
        console.log('drop off token', token);
      })
      .catch(err => {
        // Alert.alert('Unable to Drop Off');
        console.log('err drop off rideId', rideId);
        console.log('err drop off token', token);
      });
  };

  onWaitingPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    if (rideId && token) {
      // Alert.alert('Now Waiting');
      console.log('waiting');
    } else {
      // Alert.alert('Unable to wait');
    }
  };

  onReturnPickingUpPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    if (rideId && token) {
      // Alert.alert('On your way back');
      console.log('on the way back');
    } else {
      // Alert.alert('Unable to go back');
      console.log('cant go back');
    }
  };

  onReturnDroppingOffPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    if (rideId && token) {
      // Alert.alert('Dropping off at inital location');
      console.log('dropped off at pick up');
    } else {
      // Alert.alert('Unable to drop off');
      console.log('couldnt drop off at pick up');
    }
  };

  onCompletePress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    API.completeRide(rideId, token)
      .then(result => {
        Alert.alert('Ride Complete');
      })
      .catch(err => {
        Alert.alert('Could not Complete Ride');
      });
  };
  onCancelPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');
    API.cancelRide(rideId, token)
      .then(result => {
        Alert.alert('Ride Cancelled');
        navigation.navigate('MainView');
        console.log('rideId from cancel press', rideId);
        console.log('accept API call', result);
      })
      .catch(err => {
        Alert.alert('Did not Cancel');
        console.log('Did not work');
      });
  };

  onSkipPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    API.pickUpRide(rideId, token)
      .then(result => {
        console.log('Picked UP');
        API.dropOffRide(rideId, token).then(result => {
          console.log('Dropped');
          API.completeRide(rideId, token).then(result => {
            console.log('Complete');
            Alert.alert('Ride Complete');
            navigation.navigate('MainView');
          });
        });
      })
      .catch(err => {
        Alert.alert('Could not Complete Ride');
        navigation.navigate('MainView');
      });
  };

  onPress = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;

    if (textValue === 'Go to pickup') {
      // this.onPress = () => {
      this.onPickUpPress();
      this.setState({
        textValue: 'Tap to arrive'
      });
      // };
      // Alert.alert('Head to Pick Up', '', [
      //   {
      //     text: 'Picking Up?',
      //     onPress: () => {
      //       this.onPickUpPress();
      //       this.setState({
      //         textValue: 'Tap to arrive'
      //       });
      //     }
      //   }
      // ]);
    } else if (textValue === 'Tap to arrive') {
      // Alert.alert('All set?', '', [
      // {
      // text: 'Ready',
      // onPress: () => {
      this.setState({
        textValue: 'Ready'
      });
      // }
      // },
      // {
      // text: 'cancel',
      // style: 'cancel',
      // onPress: () => {
      // this.onCancelPress();
      // }
      // }
      // ]);
    } else if (textValue === 'Ready') {
      // Alert.alert('Drop Off Destination', '', [
      // {
      //   text: 'Go to Drop off',
      //   onPress: () => {
      this.onDropOffPress();
      this.setState({
        textValue: 'Drop off'
      });
      //     }
      //   },
      //   {
      //     text: 'cancel',
      //     style: 'cancel',
      //     onPress: () => {
      //       this.onCancelPress();
      //     }
      //   }
      // ]);
    } else if (textValue === 'Drop off') {
      // Alert.alert('Did you drop-off?', '', [
      //   {
      //     text: 'Confirm drop-off',
      //     onPress: () => {
      this.onWaitingPress();
      this.setState({
        textValue: 'Now Waiting'
      });
      //     }
      //   },
      //   {
      //     text: 'cancel',
      //     style: 'cancel',
      //     onPress: () => {
      //       this.onCancelPress();
      //     }
      //   }
      // ]);
    } else if (textValue === 'Now Waiting') {
      // Alert.alert('Done Waiting?', '', [
      //   {
      //     text: 'Ready for prior Destination',
      //     onPress: () => {
      this.onReturnPickingUpPress();
      this.setState({
        textValue: 'Tap to return'
      });
      //     }
      //   },
      //   {
      //     text: 'cancel',
      //     style: 'cancel',
      //     onPress: () => {
      //       this.onCancelPress();
      //     }
      //   }
      // ]);
    } else if (textValue === 'Tap to return') {
      // Alert.alert('Dropping Off?', '', [
      //   {
      //     text: 'Did you Drop off',
      //     onPress: () => {
      this.onReturnDroppingOffPress();
      this.onCompletePress();
      this.setState({
        textValue: 'Returned'
      });
      navigation.navigate('MainView');
    }
    //     },
    //     {
    //       text: 'cancel',
    //       style: 'cancel',
    //       onPress: () => {
    //         this.onCancelPress();
    //       }
    //     }
    //   ]);
    // }
  };

  renderOverview = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const startLocation = navigation.getParam('startLocation');
    const endLocation = navigation.getParam('endLocation');
    const date = navigation.getParam('date');
    const reason = navigation.getParam('reason');

    if (textValue === 'Tap to arrive') {
      return (
        <RideOverviewCard
          title="Pick up"
          address={startLocation.join(', ')}
          onPress={this.handlePickUpDirections}
        />
      );
    }
    if (textValue === 'Drop off') {
      return (
        <RideOverviewCard
          title="Drop off"
          address={endLocation.join(', ')}
          onPress={this.handleDropOffDirections}
        />
      );
    }
    if (textValue == 'Tap to return') {
      return (
        <RideOverviewCard
          title="Pick up"
          address={startLocation.join(',')}
          onPress={this.handlePickUpDirections}
        />
      );
    }
    return (
      <InitOverviewCard
        pickupAddress={startLocation.join(', ')}
        dropoffAddress={endLocation.join(', ')}
        date={date}
        note={reason}
      />
    );
  };

  render() {
    const { textValue, isVisible, latitude, longitude } = this.state;
    const { navigation } = this.props;
    // ?const name = navigation.getParam('name');

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Block center style={{ marginTop: 10 }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
              }}
              containerStyle={styles.avatarContainer}
            />
          </Block>
          <Block center space="evenly">
            <Text numberOfLines={3} style={styles.nameText}>
              {this.state.first} {this.state.last}
            </Text>
            {/* <Button onPress={this.handleGetDirections} title="Get Directions" /> */}
          </Block>
          {textValue === 'Go to pickup' && (
            <View
              row
              center
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginBottom: 10
              }}
            >
              <SkipButton onPress={this.onSkipPress} title="Skip" />
              {/* <TouchableOpacity onPress={this.onSkipPress}>
                <Text>By Pass to end</Text>
                <Icon
                  name="skip-forward"
                  size={40}
                  color="#475c67"
                  // reverse
                  // raised
                  type="material-community"
                />
              </TouchableOpacity> */}
              <CancelButton onPress={this.onCancelPress} title="Stop" />
              {/* <TouchableOpacity onPress={this.onCancelPress}>
                <Icon
                  name="close-box"
                  size={50}
                  color="#475c67"
                  // reverse
                  // raised
                  type="material-community"
                />
              </TouchableOpacity> */}
            </View>
          )}
        </View>
        <View style={{ flex: 3 }}>
          <Popup
            isVisible={isVisible}
            onCancelPressed={() => this.setState({ isVisible: false })}
            onAppPressed={() => this.setState({ isVisible: false })}
            onBackButtonPressed={() => this.setState({ isVisible: false })}
            appsWhiteList={[
              'apple-maps',
              'google-maps',
              'citymapper',
              'transit',
              'waze',
              'yandex',
              'moovit',
              'yandex-maps'
            ]}
            modalProps={{ animationIn: 'slideInUp' }}
            options={{
              latitude,
              longitude
            }}
          />
          {this.renderOverview()}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title={textValue}
            containerStyle={styles.startRideContainer}
            titleStyle={styles.startRideTitle}
            buttonStyle={styles.startRideButton}
            onPress={this.onPress}
            raised
          />
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
