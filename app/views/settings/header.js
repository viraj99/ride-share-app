import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './settingsHeaderStyle';

class SettingHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.componentsContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={this.props.onPress}>
              <Icon name="ios-arrow-back" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SettingHeader;
