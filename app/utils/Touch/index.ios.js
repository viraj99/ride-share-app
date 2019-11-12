import React from 'react';
import {TouchableHighlight} from 'react-native';

const Touch = ({children, onPress, underlayColor, ...props}) => (
  <TouchableHighlight
    underlayColor={underlayColor}
    activeOpacity={0.5}
    onPress={onPress}
    {...props}>
    {children}
  </TouchableHighlight>
);

export default Touch;
