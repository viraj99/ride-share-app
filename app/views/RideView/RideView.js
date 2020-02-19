import React, { Component } from 'react';
import { Alert, Text, View, Linking } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Popup } from 'react-native-map-link';
import API from '../../api/api';
import { InitOverviewCard, RideOverviewCard } from '../../components/Card';
import CountDown from 'react-native-countdown-component';
import Sound from 'react-native-sound';
import { TextMask } from 'react-native-masked-text';
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
      isLoading: true
    };
  }
  componentDidMount = () => {
    this.requestRider();
  };

  sound = new Sound('pacman_death.mp3');

  playSound = () => {
    this.sound.play();
  };
  requestRider = () => {
    const { navigation } = this.props;
    const token = navigation.getParam('token');
    const riderId = navigation.getParam('riderId');
    API.getRider(riderId, token).then(response => {
      console.log('response: ', response);
      this.setState({
        first: response.json.rider.first_name,
        last: response.json.rider.last_name,
        phone: response.json.rider.phone,
        isLoading: false
      });
    });
  };

  handlePickUpDirections = () => {
    // console.log('item with location:', item => item);
    // console.log('RideView PickUp', latitude, ' & ', longitude);
    this.setState({
      isVisible: true
    });
    // console.log('RideView PickUp after setState:', latitude, ' & ', longitude);
  };

  handleDropOffDirections = () => {
    // let latitude = this.props.navigation.state.params.endLocation.latitude;
    // let longitude = this.props.navigation.state.params.endLocation.longitude;
    // console.log('RideView Drop Off', latitude, ' & ', longitude);
    this.setState({
      isVisible: true
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
        this.setState({
          latitude,
          longitude
        });
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
          longitude
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
          longitude
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
          longitude
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
    console.log(
      'navigationn, ',
      navigation,
      ' token: ',
      token,
      ' rideId: ',
      rideId
    );
    API.completeRide(rideId, token)
      .then(result => {
        Alert.alert('Ride Complete');
      })
      .catch(err => {
        Alert.alert('Could not Complete Ride');
      });
  };

  onPress = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const round_trip = navigation.state.params.round_trip;
    // const expected_wait_time = navigation.state.params.expected_wait_time;
    // const convertsion = mins => {
    //   let hours = Math.floor(mins / 60);
    //   let minutes = mins % 60;
    //   minutes = minutes < 10 ? '0' + minutes : minutes;
    //   return `${hours}hrs and ${minutes}mins`;
    // };
    // console.log(
    //   'expected wait time: ',
    //   expected_wait_time,
    //   'and convertsion: ',
    //   convertsion(expected_wait_time)
    // );
    if (round_trip) {
      if (textValue === 'Go to pickup') {
        this.onPickUpPress();
        this.setState({
          textValue: 'Tap to arrive'
        });
      } else if (textValue === 'Tap to arrive') {
        this.setState({
          textValue: 'Ready'
        });
      } else if (textValue === 'Ready') {
        this.onDropOffPress();
        this.setState({
          textValue: 'Drop off'
        });
      } else if (textValue === 'Drop off') {
        this.onWaitingPress();
        this.setState({
          textValue: 'Waiting'
        });
      } else if (textValue === 'Waiting') {
        this.setState({
          textValue: 'Ready 2 go back'
        });
      } else if (textValue === 'Ready 2 go back') {
        this.onReturnPickingUpPress();
        this.setState({
          textValue: 'Ready to return'
        });
      } else if (textValue === 'Ready to return') {
        this.setState({
          textValue: 'Tap when Returned'
        });
      } else if (textValue === 'Tap when Returned') {
        this.onReturnDroppingOffPress();
        this.onCompletePress();
        this.setState({
          textValue: 'Returned'
        });
        navigation.navigate('MainView');
      }
    } else {
      if (textValue === 'Go to pickup') {
        this.onPickUpPress();
        this.setState({
          textValue: 'Tap to arrive'
        });
      } else if (textValue === 'Tap to arrive') {
        this.setState({
          textValue: 'Ready'
        });
      } else if (textValue === 'Ready') {
        this.onDropOffPress();
        this.setState({
          textValue: 'Drop off'
        });
      } else if (textValue === 'Drop off') {
        this.onCompletePress();
        navigation.navigate('MainView');
      }
    }
  };

  renderOverview = () => {
    const { textValue } = this.state;
    const { navigation } = this.props;
    const startLocation = navigation.getParam('startLocation');
    const endLocation = navigation.getParam('endLocation');
    const date = navigation.getParam('date');
    const reason = navigation.getParam('reason');
    const expected_wait_time = navigation.state.params.expected_wait_time;
    const phone = this.state.phone;
    console.log('phone: ', phone);

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
    if (textValue === 'Waiting') {
      return (
        <View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              paddingTop: 15,
              paddingBottom: 35,
              marginLeft: 15,
              marginRight: 15,
              backgroundColor: '#475c67',
              borderRadius: 40,
              borderWidth: 1,
              borderColor: '#fff'
            }}
          >
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>WAITING TIMER</Text>
            </View>
            <CountDown
              size={42}
              until={expected_wait_time * 60}
              onFinish={() =>
                this.setState({
                  textValue: 'Ready 2 go back'
                })
              }
              onPress={this.playSound()}
              digitStyle={{
                backgroundColor: '#475c67',
                borderWidth: 1,
                borderColor: '#475c67'
              }}
              digitTxtStyle={{ color: '#fcfcf6' }}
              timeLabelStyle={{ color: '#fcfcf6' }} //make time labels invisible
              separatorStyle={{ color: '#fcfcf6', paddingBottom: 40 }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ h: 'hrs', m: 'mins', s: 'secs' }}
              showSeparator
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${phone}`);
            }}
            style={styles.buttonsContainer}
          >
            <View style={styles.phoneStyle}>
              <Icon
                name="telephone"
                size={22}
                color="#fcfcf6"
                // reverse
                // raised
                type="foundation"
              />
              <TextMask
                type={'custom'}
                options={{
                  mask: '(999) 999-9999'
                }}
                style={styles.textMask}
                value={phone}
                onChangeText={text => {
                  this.setState({
                    phone: text
                  });
                }}
              />
              {/* <Icon
                name="phone"
                size={22}
                color="#fcfcf6"
                // reverse
                // raised
                type="material-community"
              /> */}
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if (textValue === 'Ready 2 go back') {
      return (
        <RideOverviewCard
          title="Return to Drop Off: "
          address={endLocation.join(', ')}
          onPress={this.handleDropOffDirections}
        />
      );
    }
    if (textValue == 'Tap when Returned') {
      return (
        <RideOverviewCard
          title="Return to the Pick up: "
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
    console.log('trying to get location: ', latitude, '&', longitude);

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
          {/* {textValue === 'Go to pickup' && ( */}
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
            <SkipButton onPress={this.onCompletePress} title="Skip" />
            <CancelButton onPress={this.onCancelPress} title="Stop" />
          </View>
          {/* )} */}
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
