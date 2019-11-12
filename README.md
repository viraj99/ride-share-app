<p align="center">
<h1 align="center">Ride Share App</h1>
</p>

Cross-platform mobile app for Android and iOS written with React Native.
[instructions](https://facebook.github.io/react-native/docs/getting-started).

## Running Locally

This is built on React Native and therefore assumes you have [node](https://nodejs.org/en/) installed.
[Yarn](https://yarnpkg.com/en/) is preferred over NPM as a package manager.

```sh
# clone the project and cd into it
git clone https://github.com/CodeTheDream/ride-share-app.git

# install dependencies
yarn

# install pods
cd /ios
pod install
cd ..

# start development environment
react-native run-ios

# Android it is recommended to first have the emulator running and then run
react-native run-android
```

Here are the react native instructions to [run on a device](https://facebook.github.io/react-native/docs/running-on-device).
