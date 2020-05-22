import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import MainApp from './navigation/routes';
import FlashMessage from "react-native-flash-message";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const App = () => (
  <AppearanceProvider>
    <View style={styles.container}>

      <MainApp />
      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" duration={3000} />
    </View>
  </AppearanceProvider>
);

export default App;
