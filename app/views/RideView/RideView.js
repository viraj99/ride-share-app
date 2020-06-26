import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Linking,
  Modal,
  TouchableOpacity as TouchableOpacity2,
} from 'react-native';
import { Avatar, Button, Badge } from 'react-native-elements';
import { Popup } from 'react-native-map-link';
import { createOpenLink } from 'react-native-open-maps';
import API from '../../api/api';
import { InitOverviewCard, RideOverviewCard } from '../../components/Card';
// import CountDown from 'react-native-countdown-component';
// import { TextMask } from 'react-native-masked-text';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import Block from '../../components/Block';
import { SkipButton, CancelButton } from '../../components/Button';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RideView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 'Go to pickup',
      isVisible: false,
      latitude: 0,
      longitude: 0,
      isLoading: true,
      riderInfo: {},
      visible: false,
      showNote: false,
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
      console.log('response: ', response);

      if (response.error) {
        return;
      }
      this.setState({
        first: response.json.rider.first_name,
        last: response.json.rider.last_name,
        phone: response.json.rider.phone,
        isLoading: false,
      });
    });

    const rideId = navigation.getParam('rideId');
    API.getRide(token, rideId).then(response => {
      console.log('-------------------- rider info--------------');
      console.log(response.ride.rider);
      let rider = {
        first_name: response.ride.rider.first_name,
        last_name: response.ride.rider.last_name,
        note: response.ride.rider.note,
        phone: response.ride.rider.phone,
        uri:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      };
      this.setState({
        riderInfo: rider,
      });
    });
  };

  handlePickUpDirections = () => {
    // openMap({});
    this.setState({
      isVisible: true,
    });
    // console.log('RideView PickUp after setState:');
  };

  handleDropOffDirections = () => {
    // const { navigation } = this.props;
    this.setState({
      isVisible: true,
    });
  };
  onPickUpPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');
    API.pickUpRide(rideId, token)
      .then(result => {
        // Alert.alert('Picking Up');
        console.log('pick up rideId', rideId);
        console.log('pick up token', token);
        console.log(
          'result',
          result.ride.start_location.latitude,
          '&',
          result.ride.start_location.longitude
        );
        const latitude = result.ride.start_location.latitude;
        const longitude = result.ride.start_location.longitude;
        const startLocation = result.ride.start_location;
        const pickup_to_dropoff = result.ride.pick_up_to_drop_off;
        console.log('pickup2dropoff', pickup_to_dropoff);
        this.setState({
          latitude,
          longitude,
          startLocation,
        });
      })
      .catch(err => {
        Alert.alert('Unable to PickUp');
        console.log('err pick up rideId', rideId);
        console.log('err pick up token', token);
        console.log(err, 'result', result);
      });
    // openMap({ latitude: this.latitude, longitude: this.longitude });
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
        console.log(
          'result',
          result.ride.end_location.latitude,
          '&',
          result.ride.end_location.longitude
        );
        const latitude = result.ride.end_location.latitude;
        const longitude = result.ride.end_location.longitude;
        this.setState({
          latitude,
          longitude,
        });
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

    API.waitingForRide(rideId, token)
      .then(result => {
        console.log('WAITING', result.ride.expected_wait_time);
      })
      .catch(err => {
        console.log('UNABLE TO WAIT');
      });
  };

  onReturnPickingUpPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    API.returnPickUp(rideId, token)
      .then(result => {
        console.log('PICKING UP: ', result);
        const latitude = result.ride.end_location.latitude;
        const longitude = result.ride.end_location.longitude;
        this.setState({
          latitude,
          longitude,
        });
      })
      .catch(err => {
        console.log('UNABLE 2 PICK UP: ', err);
      });
  };

  onReturnDroppingOffPress = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const rideId = navigation.getParam('rideId');

    API.returnDropOff(rideId, token)
      .then(result => {
        console.log('DROPPING OFF: ', result);
        const latitude = result.ride.end_location.latitude;
        const longitude = result.ride.end_location.longitude;
        this.setState({
          latitude,
          longitude,
        });
      })
      .catch(err => {
        console.log('UNABLE 2 DROP OFF: ', result);
      });
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

  // cancelRideAlert = () => {
  //   Alert.alert(
  //     'Cancel Ride',
  //     'Are you sure?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           return;
  //         },
  //         style: 'cancel',
  //       },
  //       { text: 'OK', onPress: this.onCancelPress },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  // onCancelPress = () => {
  //   const { navigation } = this.props;
  //   const token = navigation.getParam('token');
  //   const rideId = navigation.getParam('rideId');
  //   API.cancelRide(rideId, token)
  //     .then(result => {
  //       Alert.alert('Ride Cancelled');
  //       navigation.navigate('MainView', { stoppedRide: true });
  //       console.log('rideId from cancel press', rideId);
  //       console.log('accept API call', result);
  //     })
  //     .catch(err => {
  //       Alert.alert('Did not Cancel');
  //       console.log('Did not work');
  //     });
  // };

  // onSkipPress = () => {
  //   const { navigation } = this.props;
  //   const token = navigation.getParam('token');
  //   const rideId = navigation.getParam('rideId');
  //   console.log(
  //     'navigationn, ',
  //     navigation,
  //     ' token: ',
  //     token,
  //     ' rideId: ',
  //     rideId
  //   );
  //   API.completeRide(rideId, token)
  //     .then(result => {
  //       Alert.alert('Ride Complete');
  //     })
  //     .catch(err => {
  //       Alert.alert('Could not Complete Ride');
  //     });
  // };

  onPress = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const round_trip = navigation.state.params.round_trip;
    if (round_trip) {
      if (textValue === 'Go to pickup') {
        this.onPickUpPress();
        this.setState({
          textValue: 'Tap to arrive',
        });
      } else if (textValue === 'Tap to arrive') {
        this.setState({
          textValue: 'Ready',
        });
      } else if (textValue === 'Ready') {
        this.onDropOffPress();
        this.setState({
          textValue: 'Drop off',
        });
      } else if (textValue === 'Drop off') {
        this.onWaitingPress();
        this.setState({
          textValue: 'Waiting',
        });
      } else if (textValue === 'Waiting') {
        this.setState({
          textValue: 'Ready 2 go back',
        });
      } else if (textValue === 'Ready 2 go back') {
        this.onReturnPickingUpPress();
        this.setState({
          textValue: 'Ready to return',
        });
      } else if (textValue === 'Ready to return') {
        this.setState({
          textValue: 'Tap when Returned',
        });
      } else if (textValue === 'Tap when Returned') {
        this.onReturnDroppingOffPress();
        this.onCompletePress();
        this.setState({
          textValue: 'Returned',
        });
        navigation.navigate('MainView');
      }
    } else {
      if (textValue === 'Go to pickup') {
        this.onPickUpPress();
        this.setState({
          textValue: 'Tap to arrive',
        });
      } else if (textValue === 'Tap to arrive') {
        this.setState({
          textValue: 'Ready',
        });
      } else if (textValue === 'Ready') {
        this.onDropOffPress();
        this.setState({
          textValue: 'Drop off',
        });
      } else if (textValue === 'Drop off') {
        this.onCompletePress();
        navigation.navigate('MainView');
      }
    }
  };

  // gotoMaps = () => {
  //   const { navigation } = this.props;
  //   const startLoc = navigation.getParam('startLocation');
  //   console.log('start :', startLoc);
  //   openMap({ startLoc });
  // };

  renderOverview = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const startLocation = navigation.getParam('startLocation');
    const endLocation = navigation.getParam('endLocation');
    const date = navigation.getParam('date');
    const reason = navigation.getParam('reason');
    const expected_wait_time = navigation.state.params.expected_wait_time;
    const pickup_to_dropoff_distance =
      navigation.state.params.pickup_to_dropoff_distance;
    const pickup_to_dropoff_time =
      navigation.state.params.pick_up_to_drop_off_time;
    const default_to_pickup_distance =
      navigation.state.params.default_to_pickup_distance;
    const phone = this.state.phone;
    console.log('startLocation ', startLocation);
    console.log('pickup_to_dropoff_time: ', pickup_to_dropoff_time);
    console.log('default_to_pickup_distance', default_to_pickup_distance);

    if (textValue === 'Tap to arrive') {
      return (
        <RideOverviewCard
          title="Pick up"
          address={startLocation.join(', ')}
          onPress={this.handlePickUpDirections(startLocation)}
        />
      );
    }
    // if (textValue === 'Tap to arrive') {
    //   return (
    //     <RideOverviewCard
    //       title="Pick up"
    //       address={startLocation.join(', ')}
    //       onPress={this.handlePickUpDirections}
    //     />
    //   );
    // }
    // if (textValue === 'Drop off') {
    //   return (
    //     <RideOverviewCard
    //       title="Drop off"
    //       address={endLocation.join(', ')}
    //       onPress={this.handleDropOffDirections}
    //     />
    //   );
    // }
    // if (textValue === 'Waiting') {
    //   return (
    //     <View>
    //       {/* <View
    //         style={{
    //           marginTop: 10,
    //           marginBottom: 10,
    //           paddingTop: 15,
    //           paddingBottom: 35,
    //           marginLeft: 15,
    //           marginRight: 15,
    //           backgroundColor: '#475c67',
    //           borderRadius: 40,
    //           borderWidth: 1,
    //           borderColor: '#fff',
    //         }}
    //       >
    //         <View style={styles.timerContainer}>
    //           <Text style={styles.timerText}>WAITING TIMER</Text>
    //         </View>
    //         <CountDown
    //           size={42}
    //           until={expected_wait_time * 60}
    //           onFinish={() =>
    //             this.setState({
    //               textValue: 'Ready 2 go back',
    //             })
    //           }
    //           onPress={this.playSound()}
    //           digitStyle={{
    //             backgroundColor: '#475c67',
    //             borderWidth: 1,
    //             borderColor: '#475c67',
    //           }}
    //           digitTxtStyle={{ color: '#fcfcf6' }}
    //           timeLabelStyle={{ color: '#fcfcf6' }} //make time labels invisible
    //           separatorStyle={{ color: '#fcfcf6', paddingBottom: 40 }}
    //           timeToShow={['H', 'M', 'S']}
    //           timeLabels={{ h: 'hrs', m: 'mins', s: 'secs' }}
    //           showSeparator
    //         />
    //       </View>

    //       <TouchableOpacity
    //         onPress={() => {
    //           Linking.openURL(`tel:${phone}`);
    //         }}
    //         style={styles.buttonsContainer}
    //       >
    //         <View style={styles.phoneStyle}>
    //           <Icon
    //             name="telephone"
    //             size={22}
    //             color="#fcfcf6"
    //             // reverse
    //             // raised
    //             type="foundation"
    //           />
    //           <TextMask
    //             type={'custom'}
    //             options={{
    //               mask: '(999) 999-9999',
    //             }}
    //             style={styles.textMask}
    //             value={phone}
    //             onChangeText={text => {
    //               this.setState({
    //                 phone: text,
    //               });
    //             }}
    //           />
    //           {/* <Icon
    //             name="phone"
    //             size={22}
    //             color="#fcfcf6"
    //             // reverse
    //             // raised
    //             type="material-community"
    //           /> */}
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   ); */}
    // }
    // if (textValue === 'Ready 2 go back') {
    //   return (
    //     <RideOverviewCard
    //       title="Return to Drop Off: "
    //       address={endLocation.join(', ')}
    //       onPress={this.handleDropOffDirections}
    //     />
    //   );
    // }
    // if (textValue == 'Tap when Returned') {
    //   return (
    //     <RideOverviewCard
    //       title="Return to the Pick up: "
    //       address={startLocation.join(',')}
    //       onPress={this.handlePickUpDirections}
    //     />
    // );
    // }
    return (
      <InitOverviewCard
        pickupAddress={startLocation.join(', ')}
        dropoffAddress={endLocation.join(', ')}
        date={date}
        note={reason}
        pickup_to_dropoff_distance={pickup_to_dropoff_distance}
        pickup_to_dropoff_time={pickup_to_dropoff_time}
        default_to_pickup_distance={default_to_pickup_distance}
      />
    );
  };

  printBadgeNotes = () => {
    if (this.state.riderInfo.note) {
      return (
        <Badge
          value="1"
          status="error"
          containerStyle={{ position: 'absolute', top: 10, right: -4 }}
        ></Badge>
      );
    }
  };
  printNote = () => {
    if (this.state.riderInfo.note) {
      return <Text style={styles.note}>" {this.state.riderInfo.note} "</Text>;
    }
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      textValue,
      isVisible,
      latitude,
      longitude,
      startLocation,
    } = this.state;
    const { navigation } = this.props;
    console.log('trying to get location: ', latitude, '&', longitude);

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.userInfo}>
            <View>
              <TouchableOpacity2
                onPress={() => {
                  this.setState({ showNote: true });
                }}
              >
                <Avatar
                  size="large"
                  rounded
                  source={{
                    uri: this.state.riderInfo.uri,
                  }}
                  containerStyle={styles.avatarContainer}
                />
                {this.printBadgeNotes()}
              </TouchableOpacity2>
            </View>

            <View style={styles.information}>
              <Text style={styles.nameText}>
                {this.state.riderInfo.first_name}{' '}
                {this.state.riderInfo.last_name}
              </Text>
            </View>
            <View style={styles.grow}>
              <TouchableOpacity2
                onPress={() => {
                  Linking.openURL(`tel:${this.state.riderInfo.phone}`);
                }}
              >
                <View style={styles.call}>
                  <Icon
                    name="telephone"
                    size={22}
                    color="#475c67"
                    type="foundation"
                  />
                </View>
              </TouchableOpacity2>
            </View>
            <View>
              <TouchableOpacity2
                onPress={() => {
                  this.setState({ visible: true });
                }}
              >
                <View style={styles.arrow}>
                  <Icon
                    name="more-horizontal"
                    size={30}
                    color="#475c67"
                    type="feather"
                  />
                </View>
              </TouchableOpacity2>
            </View>
          </View>

          <Modal
            animated
            animationType="slideInUp"
            visible={this.state.showNote}
            transparent
          >
            <View style={styles.overlayNote}>
              <View style={styles.riderNote}>
                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                  <TouchableOpacity2
                    onPress={() => {
                      this.setState({ showNote: false });
                    }}
                  >
                    <Icon
                      name="close"
                      size={30}
                      color="#475c67"
                      type="antDesign"
                    />
                  </TouchableOpacity2>
                </View>
                <Avatar
                  size="large"
                  rounded
                  source={{
                    uri: this.state.riderInfo.uri,
                  }}
                  containerStyle={styles.avatarContainer}
                />
                <Text style={styles.nameText}>
                  {this.state.riderInfo.first_name}{' '}
                  {this.state.riderInfo.last_name}
                </Text>
                {this.printNote()}
              </View>
            </View>
          </Modal>

          <Modal
            animated
            animationType="slideInUp"
            visible={this.state.visible}
            transparent
          >
            <View style={styles.overlay}>
              <View style={styles.modalview}>
                <View style={styles.modalblock}>
                  <Icon
                    name="more-horizontal"
                    size={30}
                    color="#475c67"
                    type="feather"
                  />
                  <Button
                    title="Skip Ride"
                    containerStyle={styles.startRideContainer}
                    titleStyle={styles.modalTitle}
                    buttonStyle={styles.modalButton}
                    onPress={this.onCompletePress}
                  />
                  <Button
                    title="Cancel Ride"
                    containerStyle={styles.startRideContainer}
                    titleStyle={styles.modalTitle}
                    buttonStyle={styles.modalButton}
                    onPress={this.cancelRideAlert}
                  />
                </View>
                <View style={styles.modalblock}>
                  <Button
                    title="Close"
                    containerStyle={styles.startRideContainer}
                    titleStyle={styles.modalTitle}
                    buttonStyle={styles.modalButton}
                    onPress={this.closeModal}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ flex: 3 }}>
          {/* <Popup
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
              'yandex-maps',
            ]}
            modalProps={{ animationIn: 'slideInUp' }}
            options={{
              latitude,
              longitude,
            }}
          /> */}
          <Modal
            animated
            animationType="slideInUp"
            visible={isVisible}
            transparent
          >
            <View style={styles.overlay}>
              <View style={styles.modalview}>
                <View style={styles.modalblock}>
                  {console.log('start:::', this.latitude, this.longitude)}
                  <Button
                    title="Open Map"
                    containerStyle={styles.startRideContainer}
                    titleStyle={styles.modalTitle}
                    buttonStyle={styles.modalButton}
                    onPress={createOpenLink({ startLocation })}
                  />
                  <Button
                    title="Close"
                    containerStyle={styles.startRideContainer}
                    titleStyle={styles.modalTitle}
                    buttonStyle={styles.modalButton}
                    onPress={this.closeModal}
                  />
                </View>
              </View>
            </View>
          </Modal>

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
