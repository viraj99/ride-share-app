import React from 'react';
import { Text, ScrollView, Picker, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API from '../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class NavFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduledRides: []
    };
  }

  componentDidMount() {
    let token = AsyncStorage.getItem('token');
    console.log('TOKEN IS: ', token.token);
    API.getRides(token).then(result => {
      const scheduledRides = myRides.filter(
        ride => ride.status === 'scheduled'
      );
      this.setState({
        scheduledRides
      });
    });
  }

  goHome = navigation => {
    console.log('clicked on Home');
    navigation.navigate('MainView');
  };

  goToScheduledRides = (navigation, token, scheduledRides) => {
    console.log('clicked on Schedule');
    navigation.navigate('DriverScheduleView', { scheduledRides, token });
  };

  goToAgenda = navigation => {
    console.log('clicked on Availability');
    navigation.navigate('AgendaView');
  };

  goToSettings = navigation => {
    console.log('clicked on Settings');
    navigation.navigate('Settings');
  };

  render() {
    const navigation = this.props.navigation;
    console.log('whats up with the nav? ', navigation);
    return (
      <View style={styles.navFooterContainer}>
        <TouchableOpacity style={styles.navFooterItem}>
          <Icon
            name="home"
            size={35}
            color="#3a556a"
            style={styles.navFooterIcon}
            onPress={() => this.goHome(navigation)}
          />
          <Text style={styles.navFooterText}> Home </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navFooterItem}>
          <Icon
            name="car"
            size={35}
            color="#3a556a"
            style={styles.navFooterIcon}
            onPress={() =>
              this.goToScheduledRides(
                navigation,
                this.props.token,
                this.props.scheduledRides
              )
            }
          />

          <Text style={styles.navFooterText}> Schedule </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navFooterItem}>
          <Icon
            name="calendar"
            size={35}
            color="#3a556a"
            style={styles.navFooterIcon}
            onPress={() => this.goToAgenda(navigation)}
          />

          <Text style={styles.navFooterText}> Availability </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navFooterItem}>
          <Icon
            name="settings"
            size={35}
            color="#3a556a"
            style={styles.navFooterIcon}
            onPress={() => this.goToSettings(navigation)}
          />

          <Text style={styles.navFooterText}> Settings </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NavFooter;
