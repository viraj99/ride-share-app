import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';

const Touch = ({children, style, onPress, ...props}) => (
  <TouchableNativeFeedback onPress={onPress} {...props}>
    <View style={style}>{children}</View>
  </TouchableNativeFeedback>
);

export default Touch;
