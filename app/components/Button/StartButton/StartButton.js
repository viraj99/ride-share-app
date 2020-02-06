import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const StartButton = ({ title, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#f9a4a4', '#ff9d84', '#ff8262']}
    style={styles.linearGradient}
  >
    <View style={styles.buttonWrapper}>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <ArrowIcon
            color="#ff8262"
            name="arrowright"
            size={20}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default StartButton;
