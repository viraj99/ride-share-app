import React from 'react';
import { StyleSheet } from 'react-native';
import variables from '../utils/variables';

import Block from './Block';

const styles = StyleSheet.create({
  badge: {
    height: variables.sizes.base,
    width: variables.sizes.base,
    borderRadius: variables.sizes.border,
  },
});

const Badge = ({
  children, style, size, color, ...props
}) => {
  const badgeStyles = StyleSheet.flatten([
    styles.badge,
    size && {
      height: size,
      width: size,
      borderRadius: size,
    },
    style,
  ]);

  return (
    <Block flex={false} middle center color={color} style={badgeStyles} {...props}>
      {children}
    </Block>
  );
};

export default Badge;
