/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MainView } from './views';

type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// will add navigation in here later

const App = () => (
  <View style={styles.container}>
    <MainView />
  </View>
);

export default App;
