# Ride Share App

Cross-platform mobile app for Android and iOS written with React Native.
[instructions](https://facebook.github.io/react-native/docs/getting-started).

## Prerequisites

- Cocoapods
- Xcode
- Android Studio
- Java JDK 14

## First time setup

### Mac

`yarn setup:mac`

#### Android Prep

You must have Android Studio setup with at least one AVD. Make sure to have downloaded the latest platform-tools and accepted the licenses. All this can be done through the SDK manager in Android Studio.

You may potentially need to add the path to your SDK directory to your system PATH. For Mac it can be done by added the below line to `~/.bash_profile` or `~/.zshrc`

`export ANDROID_SDK_ROOT=~/Library/Android/sdk`

Then install Java JDK and update settings:

1. Install Java JDK 14 - using [sdkman](https://sdkman.io/) - `sdk install java 14.0.0-open`
2. Run gradle `./gradlew`

### Windows

## Running Locally

This is built on React Native and therefore assumes you have [node](https://nodejs.org/en/) installed.
[Yarn](https://yarnpkg.com/en/) is preferred over NPM as a package manager.

```sh
# clone the project and cd into it
git clone https://github.com/CodeTheDream/ride-share-app.git

# install dependencies
yarn

# start development environment

# iOS
yarn ios

# Android
yarn android
```

Here are the react native instructions to [run on a device](https://facebook.github.io/react-native/docs/running-on-device).
