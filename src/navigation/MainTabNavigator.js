import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import RfidHistory from '../screens/RfidHistory';
import SensorMain from '../screens/SensorMain';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Inicio: SensorMain,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const HistoryStack = createStackNavigator(
  {
    RfidHistory: RfidHistory,
  },
  config
);

HistoryStack.navigationOptions = {
  tabBarLabel: 'Historial',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
  ),
};

HistoryStack.path = '';

const tabNavigator = createMaterialBottomTabNavigator({
    HomeStack,
    HistoryStack,
  },
  {
    activeColor: Colors.activeColor,
    inactiveColor: Colors.inactiveColor,
    barStyle: { backgroundColor: Colors.tabBar },
  });

tabNavigator.path = '';

export default tabNavigator;
