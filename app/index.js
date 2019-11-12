import React from 'react';
import {StyleSheet, View} from 'react-native';

import MainApp from './navigation/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => (
  <View style={styles.container}>
    <MainApp />
  </View>
);

export default App;
