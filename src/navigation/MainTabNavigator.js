import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import History from '../screens/History';
import Rfid from '../screens/Rfid';
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
    RFID : Rfid,
    Historial : History 
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

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  HistoryStack,
});

tabNavigator.path = '';

export default tabNavigator;
