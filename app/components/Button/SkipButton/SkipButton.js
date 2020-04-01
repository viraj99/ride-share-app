import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const SkipButton = ({ title, onPress }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#57717e', '#475c67', '#678595']}
    style={styles.linearGradient}
  >
    <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.circleButtonContainer}>
          <Icon
            name="skip-forward"
            size={30}
            color="#475c67"
            // reverse
            // raised
            type="material-community"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.startTextContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </View>
  </LinearGradient>
);

export default SkipButton;
