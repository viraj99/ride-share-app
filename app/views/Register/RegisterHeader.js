import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../settings/settingsHeaderStyle';

class RegisterHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.componentsContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={this.props.onPress}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Icon name="ios-arrow-back" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{this.props.title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default RegisterHeader;
