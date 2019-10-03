import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Progress from 'react-native-progress';

export default function TabBarIcon(props) {
  return (
    <View style={styles.historyEntry}>
      <View style={styles.entryTitle}>
        <View style={styles.employeeName}>
          <Text style={styles.header1}>Empleado: {props.whoCleaned}</Text>
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.header2}>Fecha: {props.date}</Text>
          <Text style={styles.header2}>Hora: {props.time}</Text>
        </View>
      </View>
      {console.log()}
      <View style={styles.levels}>
        <Text style={{alignSelf: 'flex-start', fontSize: 17, fontWeight: 'bold'}}>Niveles</Text>
        <Text style={styles.header2}>Papel Higiénico:</Text>
        <Progress.Circle showsText={true} progress={((props.paper - 134128)/(143350 - 134128)) < 0 ? 0.001 : (((props.paper - 134128)/(143350 - 134128)) > 1) ? 0.999 : (props.paper - 134128)/(143350 - 134128)} size={100} style={styles.centered, {paddingVertical:3}} color="#000"/>
        <Text style={styles.header2}>Jabón Líquido:</Text>
        <Progress.Circle showsText={true} progress={(Math.abs(1 - (props.soap - 2)/(15-2))) < 0 ? 0.001 : ((Math.abs(1 - (props.soap - 2)/(15-2))) > 1 ? 0.999 : Math.abs(1 - (props.soap - 2)/(15-2)))} size={100} style={styles.centered, {paddingVertical:3}} color="#000"/>
        <Text style={styles.header2}>Alcohol en gel:</Text>
        <Progress.Circle showsText={true} progress={(Math.abs(1 - (props.alcohol - 2)/(15-2))) < 0 ? 0.001 : ((Math.abs(1 - (props.alcohol - 2)/(15-2))) > 1 ? 0.999 : Math.abs(1 - (props.alcohol - 2)/(15-2)))} size={100} style={styles.centered, {paddingVertical:3}} color="#000"/>
      </View>
    </View>
  );
} 

let styles = StyleSheet.create({
  historyEntry: {
    flex: 1
  },
  entryTitle: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: 'row',
    flex: 1
  },
  employeeName: {
    justifyContent: 'center',
    flex: 1,
  },
  header1: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  dateTime: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  levels: {
    paddingHorizontal: 10,
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center'
  }
}); 