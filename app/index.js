/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainApp from './navigation/routes';

type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// will add navigation in here later

const App = () => (
  <View style={styles.container}>
    <MainApp />
  </View>
);

export default App;
