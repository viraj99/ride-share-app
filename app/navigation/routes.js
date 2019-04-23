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
    },
    RideView: {
      screen: RideView,
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
