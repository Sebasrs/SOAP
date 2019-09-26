import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <View style={ styles.historyEntry }>
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

let styles = StyleSheet.create({
  historyEntry : {
    marginHorizontal : 5,
    marginTop: 8
  }
}); 