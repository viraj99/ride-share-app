import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import {
  MainView,
  Login,
  AgendaView,
  AuthLoadingScreen,
  RideView,
  DriverScheduleView,
  RidesRequestedView,
  RequestedRidesDetails,
  Settings,
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
    RidesRequested: {
      screen: RidesRequestedView,
      navigationOptions: {
        headerTitle: 'Requested Rides',
        headerStyle: {
          backgroundColor: '#1EAA70',
        },
        headerTintColor: '#fff',
      },
    },
    RequestedRidesDetails: {
      screen: RequestedRidesDetails,
      navigationOptions: {
        headerTitle: 'Requested Rides Details',
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
  { SignIn: Login },
  {
    headerMode: 'none',
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
