import React from 'react';
import {
  Animated, TextInput, TouchableWithoutFeedback, View, StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: '#7771ab',
  },
  textInput: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    paddingLeft: 0,
    color: 'white',
    fontSize: 16,
  },
});

export default class Sae extends BaseInput {
  static defaultProps = {
    height: 48,
    inputPadding: 16,
    labelHeight: 24,
    borderHeight: 2,
    animationDuration: 300,
  };

  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputPadding,
      labelHeight,
      borderHeight,
      inputStyle,
      labelStyle,
      borderColor,
    } = this.props;
    const { width, focusedAnim, value } = this.state;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
          },
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, labelHeight + inputPadding],
              }),
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 12],
                  }),
                },
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
            },
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid="transparent"
        />
        {/* bottom border */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: borderHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: borderColor,
          }}
        />
      </View>
    );
  }
}
