import React from 'react';
import { StyleSheet, View } from 'react-native';
import variables from '../utils/variables';

export const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: 16,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: variables.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
  },
  accent: { backgroundColor: variables.colors.accent },
  primary: { backgroundColor: variables.colors.primary },
  secondary: { backgroundColor: variables.colors.secondary },
  tertiary: { backgroundColor: variables.colors.tertiary },
  black: { backgroundColor: variables.colors.black },
  white: { backgroundColor: variables.colors.white },
  gray: { backgroundColor: variables.colors.gray },
  gray2: { backgroundColor: variables.colors.gray2 },
  gray3: { backgroundColor: variables.colors.gray3 },
  gray4: { backgroundColor: variables.colors.gray4 },
});

const Block = ({
  flex,
  row,
  column,
  center,
  middle,
  left,
  right,
  top,
  bottom,
  card,
  shadow,
  color,
  space,
  style,
  children,
  ...props
}) => {
  const blockStyles = [
    styles.block,
    flex && { flex },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    card && styles.card,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    style, // rewrite predefined styles
  ];

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;
