import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const CancelButton = ({ title, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#678595', '#57717e', '#475c67']}
    style={styles.linearGradient}
  >
    <View style={styles.buttonWrapper}>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <Icon
            name="close"
            size={30}
            color="#475c67"
            type="material-community"
          />
        </View>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

export default CancelButton;
