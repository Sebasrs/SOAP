import React from 'react';
import { View, Text } from 'react-native';
 
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <View>
      <Text>Empleado: {props.whoCleaned}</Text>
      <Text>Fecha: {props.date}</Text>
      <Text>Hora: {props.time}</Text>
      <Text>Niveles</Text>
      <Text>Papel Higiénico: {props.paper}</Text>
      <Text>Jabón Líquido {props.soap}</Text>
      <Text>Alcohol en gel {props.alcohol}</Text>
    </View>
  );
}
