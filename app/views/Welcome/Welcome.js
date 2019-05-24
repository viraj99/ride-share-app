import React from 'react';
import {
  Text, View, Image, StatusBar,
} from 'react-native';

import styles from './styles';
import logo from '../../utils/images/route.png';

import { CalendarButton } from '../../components/Button';

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Ride Share</Text>
      </View>
      <View style={styles.image}>
        <Image source={logo} />
        {/* Icon made by Map & Navigation from www.flaticon.com */}
      </View>
    </View>
    <View style={{ paddingHorizontal: 32, paddingTop: 16 }}>
      <CalendarButton title="Login" onPress={() => navigation.navigate('Login')} />
      <CalendarButton title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  </View>
);

export default Welcome;
