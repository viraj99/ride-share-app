import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {
  MainView,
  Login,
  AgendaView,
  AuthLoadingScreen,
  RideView,
  DriverScheduleView,
  RequestedRidesDetails,
  Settings,
  Register,
  ForgotPassword,
  Welcome,
} from '../views';

const MainViewStack = createStackNavigator(
  {
    MainView: {
      screen: MainView,
      navigationOptions: {
        header: () => null,
      },
    },
    AgendaView: {
      screen: AgendaView,
      navigationOptions: {
        header: () => null,
      },
    },
    Settings: {
      screen: Settings,
    },
    RideView: {
      screen: RideView,
      navigationOptions: {
        headerTitle: 'Ride Overview',
        headerStyle: {
          backgroundColor: '#1EAA70',
        },
        headerTintColor: '#fff',
      },
    },
    DriverScheduleView: {
      screen: DriverScheduleView,
      navigationOptions: {
        headerTitle: 'Scheduled Rides',
        headerStyle: {
          backgroundColor: '#1EAA70',
        },
        headerTintColor: '#fff',
      },
    },
    RequestedRidesDetails: {
      screen: RequestedRidesDetails,
      navigationOptions: {
        headerTitle: 'Requested Ride Details',
        headerStyle: {
          backgroundColor: '#1EAA70',
        },
        headerTintColor: '#fff',
      },
    },
  },

  {
    headerMode: 'screen',
    headerBackTitleVisible: false,
  },
);

const AppStack = createStackNavigator(
  { Home: MainViewStack },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: () => null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#C5CCD6',
      },
    },
  },
  {
    headerBackTitleVisible: false,
  },
);

const AppStackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(AppStackNavigator);
