import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import MainApp from './navigation/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const App = () => (
  <AppearanceProvider>
    <View style={styles.container}>
      <MainApp />
    </View>
  </AppearanceProvider>
);

export default App;
