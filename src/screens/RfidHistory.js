import React from "react";
import { Text, Button, View } from "react-native";

import Colors from '../constants/Colors';

export default function RfidHistory(props) {
  return (
    <View>
      <Text>Hola</Text>
      <Button
        title="Historial completo"
      />
    </View>
  )
}

RfidHistory.navigationOptions = {
  title: 'Historial',
  headerStyle: {
    backgroundColor: Colors.tabBar,
  },
  headerTintColor: Colors.tintColor,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 25
  },
};