import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, Switch, AsyncStorage,
} from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Radius from 'react-native-vector-icons/MaterialCommunityIcons';
import Phone from 'react-native-vector-icons/AntDesign';
import Notifications from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/SimpleLineIcons';
import SettingHeader from './header';
import styles from './settingsStyle.js';
import API from '../../api/api';

class Settings extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      notifications: true,
      buttonTitle: false,
      email: '',
      phoneNumber: '',
      radius: '',
      make: '',
      color: '',
      name: '',
      model: '',
      firstName: '',
      lastName: '',
      organization_id: '',
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleMake = this.handleMake.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleBackButton() {
    this.props.navigation.navigate('MainView');
  }

  handleLogout() {
    AsyncStorage.getItem('token', (err, result) => {
      const obj = JSON.parse(result);
      const tokenValue = obj.token;
      API.logout(tokenValue).then((res) => {
        const loggedOut = res.json.Success;
        if (loggedOut == 'Logged Out') {
          AsyncStorage.removeItem('token');
          this.props.navigation.navigate('Auth');
        } else {
          console.log('no working');
        }
      });
    });
  }

  handleEdit() {
    this.setState({
      editable: !this.state.editable,
      buttonTitle: !this.state.buttonTitle,
    });
    if (this.state.editable) {
      const data = {
        organization_id: this.state.organization_id,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phoneNumber,
        radius: this.state.radius,
        is_active: this.state.notifications,
        car_make: this.state.make,
        car_model: this.state.model,
        car_color: this.state.color,
      };
      AsyncStorage.getItem('token', (err, result) => {
        const obj = JSON.parse(result);
        const tokenValue = obj.token;
        API.updateSettingsInfo(tokenValue, data);
      });
    } else {
      null;
    }
  }

  handleFirstName = (text) => {
    this.setState({
      firstName: text,
    });
  };

  handleLastName = (text) => {
    this.setState({
      lastName: text,
    });
  };

  handleEmail = (text) => {
    this.setState({
      email: text,
    });
  };

  handlePhoneNumber = (text) => {
    this.setState({
      phoneNumber: text,
    });
  };

  handleRadius = (text) => {
    this.setState({
      radius: text,
    });
  };

  handleMake = (text) => {
    this.setState({
      make: text,
    });
  };

  handleModel = (text) => {
    this.setState({
      model: text,
    });
  };

  handleColor = (text) => {
    this.setState({
      color: text,
    });
  };

  handleSwitch = (value) => {
    this.setState({
      notifications: value,
    });
  };

  componentWillMount() {
    AsyncStorage.getItem('token', (err, result) => {
      const obj = JSON.parse(result);
      const tokenValue = obj.token;
      console.log(tokenValue);
      API.getSettingInfo(tokenValue).then((res) => {
        this.setState({
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email,
          phoneNumber: res.phone,
          radius: JSON.stringify(res.radius),
          notifications: res.is_active,
          make: res.car_make,
          model: res.car_model,
          color: res.car_color,
          organization_id: res.organization_id,
        });
      });
    });
  }

  render() {
    return (
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
                      placeholder="John"
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
                      placeholder="Doe"
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
                  placeholder="Example@domain.com"
                  value={this.state.email}
                  onChangeText={this.handleEmail}
                  editable={this.state.editable}
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
              <Radius name="radius-outline" size={30} color="#475c67" />
              <View style={styles.bottomBorder}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="10 miles"
                  value={this.state.radius}
                  onChangeText={this.handleRadius}
                  editable={this.state.editable}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Notifications name="notifications-none" size={30} color="#475c67" />
              <Switch
                disabled={this.state.editable}
                onValueChange={this.handleSwitch}
                value={this.state.notifications}
              />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Car</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Make</Text>
              <View style={styles.bottomBorder}>
                <TextInput
                  style={styles.input}
                  placeholder="Ford"
                  value={this.state.make}
                  editable={this.state.editable}
                  onChangeText={this.handleMake}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Model</Text>
              <View style={styles.bottomBorder}>
                <TextInput
                  style={styles.input}
                  placeholder="Civic"
                  value={this.state.model}
                  editable={this.state.editable}
                  onChangeText={this.handleModel}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Color</Text>
              <View style={styles.bottomBorder}>
                <TextInput
                  style={styles.input}
                  placeholder="Blue"
                  value={this.state.color}
                  editable={this.state.editable}
                  onChangeText={this.handleColor}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.editButton} onPress={this.handleEdit}>
              <Text style={styles.buttonTitle}>{this.state.buttonTitle ? 'Update' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
            <Text style={styles.buttonTitle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Settings;
