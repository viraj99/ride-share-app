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
        headerTitle: 'Calendar',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerTitle: 'Settings',
      },
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
    },
    RidesRequested: {
      screen: RidesRequestedView,
    },
    RequestedRidesDetails: {
      screen: RequestedRidesDetails,
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

export default createAppContainer(AppStack);
