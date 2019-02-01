import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
} from 'react-native';

type Props = {};
export default class MainView extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>MAIN VIEW </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
