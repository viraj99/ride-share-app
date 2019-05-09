import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

import { NativeModules } from 'react-native';

jest.mock('NativeAnimatedHelper');
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.useFakeTimers();
Date.now = jest.fn(() => 1503187200000);
Object.assign(NativeModules, {
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
  PlatformConstants: {
    forceTouchAvailable: false,
  },
});
