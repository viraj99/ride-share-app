import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, Switch,
} from 'react-native';
import styles from './settingsStyle.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      notifications: true,
      buttonTitle: false,
      name: '',
      phoneNumber: '',
      radius: '',
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleMake = this.handleMake.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleEdit() {
    this.setState({
      editable: !this.state.editable,
      buttonTitle: !this.state.buttonTitle,
    });
  }

  handleName = (text) => {
    this.setState({
      name: text,
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

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.header}>Settings</Text>
        </View> */}

        <View style={styles.settingSection}>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Account</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Example@domain.com"
                value={this.state.name}
                onChangeText={this.handleName}
                editable={this.state.editable}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="999-999-9999"
                dataDetectorTypes="phoneNumber"
                value={this.state.phoneNumber}
                onChangeText={this.handlePhoneNumber}
                editable={this.state.editable}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Radius</Text>
              <TextInput
                style={styles.input}
                placeholder="10"
                value={this.state.radius}
                onChangeText={this.handleRadius}
                editable={this.state.editable}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Notifications</Text>
              <Switch onValueChange={this.handleSwitch} value={this.state.notifications} />
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Car</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Make</Text>
              <TextInput
                style={styles.input}
                placeholder="Ford"
                editable={this.state.editable}
                onChangeText={this.handleMake}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Color</Text>
              <TextInput
                style={styles.input}
                placeholder="Blue"
                editable={this.state.editable}
                onChangeText={this.handleColor}
              />
            </View>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.editButton} onPress={this.handleEdit}>
              <Text style={styles.buttonTitle}>{this.state.buttonTitle ? 'Update' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.buttonTitle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Settings;
