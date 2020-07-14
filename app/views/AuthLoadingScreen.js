import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../api/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation } = this.props;
    let keepGoing;
    const userToken = await AsyncStorage.getItem('token');
    console.log('auth token', userToken);
    const parsed = JSON.parse(userToken);
    console.log('auth thoken parsed', parsed);

    if (userToken === null) {
      console.log('inside if');
      keepGoing = false;
    } else {
      keepGoing = await this.validateToken(parsed.token);
    }

    keepGoing
      ? navigation.navigate({
          routeName: 'MainView',
          key: 'MainView',
          params: { isRegistering: false },
        })
      : navigation.navigate('Auth');
    // This will switch to the MainView screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  validateToken = async token => {
    let response = await API.getAvailabilities(token).then(result => {
      console.log('result fomr auth', result);
      if (result.error === 'Unauthorized') {
        console.log('remove token and push to login else load main view');
        AsyncStorage.removeItem('token');
        return false;
      } else {
        return true;
      }
    });

    console.log('validating token', response);
    return response;
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#ffff" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
