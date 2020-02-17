import React from 'react';
import { Text, View, Image, StatusBar } from 'react-native';

import styles from './styles';
import logo from '../../utils/images/route.png';
import CalendarButton from '../../components/Button/CalendarButton/CalendarButton';
import CalendarButtonRed from '../../components/Button/CalendarButton/CalendarButtonRed';

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>CRSN</Text>
        <Text style={styles.title}>Community Ride Share Network</Text>
      </View>
      <View style={styles.image}>
        <Image source={logo} />
        {/* Icon made by Map & Navigation from www.flaticon.com */}
      </View>
    </View>
    <View style={{ paddingHorizontal: 32, paddingTop: 16 }}>
      <CalendarButton
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <CalendarButtonRed
        title="Register"
        style={styles.registerButtonContainer}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  </View>
);

export default Welcome;
