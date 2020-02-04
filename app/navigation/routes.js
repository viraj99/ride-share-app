// import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  MainView,
  Login,
  AgendaView,
  AvailabilityView,
  AuthLoadingScreen,
  RideView,
  DriverScheduleView,
  RequestedRidesDetails,
  Settings,
  Register,
  RegisterVehicle,
  RegisterAvailability,
  ForgotPassword,
  Welcome
} from '../views';

const MainViewStack = createStackNavigator(
  {
    MainView: {
      screen: MainView,
      navigationOptions: {
        header: () => null
      }
    },
    AgendaView: {
      screen: AgendaView,
      navigationOptions: {
        header: () => null
      }
    },
    // AvailabilityView: {
    //   screen: AvailabilityView,
    //   navigationOptions: {
    //     header: () => null,
    //   },
    // },
    Settings: {
      screen: Settings
    },
    RideView: {
      screen: RideView,
      navigationOptions: {
        headerTitle: 'Ride Overview',
        headerStyle: {
          backgroundColor: '#475c67'
        },
        headerTintColor: '#fff'
      }
    },
    DriverScheduleView: {
      screen: DriverScheduleView,
      navigationOptions: {
        headerTitle: 'Scheduled Rides',
        headerStyle: {
          backgroundColor: '#475c67'
        },
        headerTintColor: '#fff'
      }
    },
    RequestedRidesDetails: {
      screen: RequestedRidesDetails,
      navigationOptions: {
        headerTitle: 'Requested Ride Details',
        headerStyle: {
          backgroundColor: '#475c67'
        },
        headerTintColor: '#fff'
      }
    }
  },

  {
    headerMode: 'screen',
    headerBackTitleVisible: false
  }
);

const AppStack = createStackNavigator(
  { Home: MainViewStack },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

const RegisterStack = createStackNavigator(
  {
    RegisterUserInfo: {
      screen: Register,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
        headerLeft: null
      }
    },
    RegisterVehicle: {
      screen: RegisterVehicle,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
        headerLeft: null
      }
    },
    RegisterAvailability: {
      screen: RegisterAvailability,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
        headerLeft: null
      }
    }
  },
  {
    headerBackTitleVisible: false
  }
);

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: () => null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6'
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6'
      }
    },
    Register: {
      screen: RegisterStack,
      navigationOptions: {
        header: () => null
      }
    }
  },
  {
    headerBackTitleVisible: false
  }
);

const AppStackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export default createAppContainer(AppStackNavigator);
