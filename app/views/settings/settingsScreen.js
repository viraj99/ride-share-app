import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
  Alert,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Radius from 'react-native-vector-icons/MaterialCommunityIcons';
import Phone from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import { AddButton } from '../../components/Button';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationEvents } from 'react-navigation';
import { Header } from '../../components/Header';
import { List, ListItem } from 'react-native-elements';
import User from 'react-native-vector-icons/SimpleLineIcons';
import { ScrollView } from 'react-native-gesture-handler';
import SettingHeader from './header';
import styles from './settingsStyle.js';
import API from '../../api/api';
import { VehicleCard } from '../../components/Card';
import Animated from 'react-native-reanimated';
import variables from '../../utils/variables';
import { DeleteButton } from '../../components/Button';

class Settings extends Component {
  _isMounted = false;
  scrollX = new Animated.Value(0);
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // is_mounting: false,
      editable: false,
      active: true,
      buttonTitle: false,
      allowEmailNotification: false,
      allowPhoneNotification: false,

      email: '',
      phoneNumber: '',
      radius: '',
      make: '',
      color: '',
      name: '',
      model: '',
      firstName: '',
      lastName: '',
      organization_id: ''
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleMake = this.handleMake.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleEmailNotification = this.handleEmailNotification.bind(this);
    this.handlePhoneNotification = this.handlePhoneNotification.bind(this);
    // this.handleBackButton = this.handleBackButton.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('MainView');
  };

  handleLogout() {
    AsyncStorage.getItem('token', (err, result) => {
      const obj = JSON.parse(result);
      const { token } = obj;
      API.logout(token)
        .then(res => {
          const loggedOut = res.json.Success;
          if (loggedOut == 'Logged Out') {
            AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Auth');
          } else {
            Alert.alert('Unable to Logout', 'Please try again.');
          }
        })
        .catch(error => {
          AsyncStorage.removeItem('token');
          this.props.navigation.navigate('Auth');
        });
    });
  }

  handleEdit() {
    this.setState({
      editable: !this.state.editable,
      buttonTitle: !this.state.buttonTitle
    });
    if (this.state.editable) {
      const driverData = {
        organization_id: this.state.organization_id,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phoneNumber,
        radius: this.state.radius,
        is_active: this.state.active,
        allowEmailNotification: this.state.allowEmailNotification
      };
      AsyncStorage.getItem('token', (err, result) => {
        const obj = JSON.parse(result);
        const { token } = obj;

        API.updateSettingsDriver(driverData, token)
          .then(result => {
            // const driverRes = (result);
            // console.log('driverRes', driverRes);
            // console.log('driverData ', driverData);
            // API.updateSettingsVehicle(vehicleData, token)
            // .then(res => {
            //   console.log('inside updateSettings');
            // const vehicleRes = (res);
            // console.log('vehicle response', vehicleRes);
            // console.log('vehicle Data', vehicleData);
            //   this.setState({
            //     organization_id: driverRes.organization_id,
            //     first_name: driverRes.firstName,
            //     last_name: driverRes.lastName,
            //     email: driverRes.email,
            //     phone: driverRes.phoneNumber,
            //     radius: driverRes.radius,
            //     is_active: driverRes.active,
            // })
            //})
            // this.setState({
            //   data,
            // })
          })
          .catch(err => {
            console.log(err);
          });
      });
    } else {
      null;
    }
  }

  handleFirstName = text => {
    this.setState({
      firstName: text
    });
  };

  handleLastName = text => {
    this.setState({
      lastName: text
    });
  };

  handleEmail = text => {
    this.setState({
      email: text
    });
  };

  handlePhoneNumber = text => {
    this.setState({
      phoneNumber: text
    });
  };

  handleRadius = text => {
    this.setState({
      radius: text
    });
  };

  handleMake = text => {
    this.setState({
      make: text
    });
  };

  handleModel = text => {
    this.setState({
      model: text
    });
  };

  handleColor = text => {
    this.setState({
      color: text
    });
  };
  handleInsurance = text => {
    this.setState({
      insurance: text
    });
  };
  handleActive() {
    this.setState({
      active: !this.state.active
    });
  }

  handleEmailNotification() {
    this.setState({
      allowEmailNotification: !this.state.allowEmailNotification
    });
  }

  handlePhoneNotification() {
    this.setState({
      allowPhoneNotification: !this.state.allowPhoneNotification
    });
  }

  async componentDidMount() {
    await AsyncStorage.getItem('token', (err, result) => {
      const obj = JSON.parse(result);
      const tokenValue = obj.token;
      this._isMounted = true;

      API.getSettingInfo(tokenValue)
        .then(res => {
          const settingInfo = res;
          console.log('settingsInfo', settingInfo);
          if (this._isMounted) {
            this.setState({
              firstName: settingInfo.driver.first_name,
              lastName: settingInfo.driver.last_name,
              email: settingInfo.driver.email,
              phoneNumber: settingInfo.driver.phone,
              radius: JSON.stringify(settingInfo.driver.radius),
              active: settingInfo.driver.is_active,
              organization_id: settingInfo.driver.organization_id
            });
          }
          API.getVehicle(tokenValue).then(response => {
            const vehicles = response.vehicle;
            console.log('vehicles from API :', vehicles);
            this.setState({
              vehicles
            });
          });
        })
        .catch(err => {
          AsyncStorage.removeItem('token');
          this.props.navigation.navigate('Auth');
        });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteVehicle = id => {
    Alert.alert('Delete this Vehicle?', '', [
      { text: "Don't Delete", style: 'cancel' },
      {
        text: 'Yes, delete this vehicle',
        onPress: async () => {
          const value = await AsyncStorage.getItem('token');
          const parsedValue = JSON.parse(value);
          const realToken = parsedValue.token;
          this.setState({
            token: realToken
          });
          console.log('Number of times this runs');
          API.deleteVehicle(id, realToken)
            .then(result => {
              newVehicles = [...this.state.vehicles];
              updatedVehicleArray = newVehicles.filter(
                vehicle => vehicle.id !== id
              );
              this.setState({
                vehicles: updatedVehicleArray
              });
              console.log('updatedVehicleArray', updatedVehicleArray);
              console.log('result of delete Api', result);
              console.log('worked');
            })
            .catch(err => {
              console.log('DIDNT Work');
            });
        }
      }
    ]);
  };

  Vehicles = item => {
    const { token } = this.state;
    const { navigation } = this.props;
    const vehicle = item;
    const make = item.item.car_make;
    const model = item.item.car_model;
    const vehicleId = item.item.id;
    const year = item.item.car_year;
    console.log(vehicleId, 'v ID');
    return (
      <VehicleCard
        key={item.id}
        deleteVehicle={this.deleteVehicle}
        onPress={() => {
          navigation.navigate('RegisterVehicle', {
            vehicle,
            isEditing: true,
            isAdding: false
          });
        }}
        token={token}
        make={make}
        model={model}
        year={year}
        vehicleId={vehicleId}
      />
    );
  };
  renderVehicles = () => {
    const { vehicles } = this.state;
    console.log('vehicles from renderVehicles: ', vehicles);

    if (vehicles) {
      return (
        <View>
          <FlatList
            data={this.state.vehicles}
            extraData={this.state}
            renderItem={item => this.Vehicles(item)}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      );
    } else {
      console.log('DIDNT WORK in renderVehicles');
      return null;
    }
  };

  // componentWillUnmount() {
      // this.setState({
        // is_mounting: false,
      // })
  // }

  render() {
    console.log('in render this.state.vehicles', this.state.vehicles);
    const { token } = this.state;
    console.log('in render this.state = token', token);
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <SettingHeader onPress={this.handleBackButton} />
          <View style={styles.settingSection}>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Account</Text>
              </View>
              <View style={styles.inputContainer}>
                <User name="user" size={30} color="#475c67" />
                <View style={styles.userFirstLastName}>
                  <View style={{ paddingRight: 8 }}>
                    <View style={styles.bottomBorder}>
                      <TextInput
                        style={styles.input}
                        placeholder="First"
                        value={this.state.firstName}
                        onChangeText={this.handleFirstName}
                        editable={this.state.editable}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.bottomBorder}>
                      <TextInput
                        style={styles.input}
                        placeholder="Last"
                        value={this.state.lastName}
                        onChangeText={this.handleLastName}
                        editable={this.state.editable}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Email name="email-outline" size={30} color="#475c67" />
                <View style={styles.bottomBorder}>
                  <TextInput
                    keyboardType="email-address"
                    style={styles.input}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                    editable={this.state.editable}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Phone name="phone" size={30} color="#475c67" />
                <View style={styles.bottomBorder}>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="999-999-9999"
                    dataDetectorTypes="phoneNumber"
                    value={this.state.phoneNumber}
                    onChangeText={this.handlePhoneNumber}
                    editable={this.state.editable}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Radius name="map-marker-radius" size={30} color="#475c67" />

                <View style={styles.bottomBorder}>
                  <Text style={styles.radiusTitle}>Radius</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="5"
                    value={this.state.radius}
                    onChangeText={this.handleRadius}
                    editable={this.state.editable}
                  />
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Notifications</Text>
              </View>
              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.inputTitle}>Active </Text>
                  <Text style={styles.notificationDescription}>
                    Turn off/on Active Status
                  </Text>
                </View>
                <View style={styles.switchStyle}>
                  <Switch
                    disabled={!this.state.editable}
                    onValueChange={this.handleActive}
                    value={this.state.active}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                {/* <View>
                  <Text style={styles.inputTitle}>Email</Text>
                  <Text style={styles.notificationDescription}>
                    Turn off/on email notifications
                  </Text>
                </View>
                <View style={styles.switchStyle}>
                  <Switch
                    disabled={!this.state.editable}
                    onValueChange={this.handleEmailNotification}
                    value={this.state.allowEmailNotification}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.inputTitle}>Phone </Text>
                  <Text style={styles.notificationDescription}>
                    Turn off/on phone notifications
                  </Text>
                </View>
                <View style={styles.switchStyle}>
                  <Switch
                    disabled={!this.state.editable}
                    onValueChange={this.handlePhoneNotification}
                    value={this.state.allowPhoneNotification}
                  />
                </View> */}
              </View>
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={this.handleEdit}
              >
                <Text style={styles.buttonTitle}>
                  {this.state.buttonTitle ? 'Update' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Vehicles</Text>
              <AddButton
                onPress={() => {
                  navigation.navigate('RegisterVehicle', {
                    isAdding: true,
                    isEditing: false
                  });
                }}
                token={token}
              />
            </View>
            {this.state.vehicles && <View>{this.renderVehicles()}</View>}
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this.handleLogout}
            >
              <Text style={styles.buttonTitle}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
    // }
  }
}

export default Settings;
