import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';

const SensorData = props => (
  <View style={styles.sensor}>
    <Image
      style={styles.beautyIcon}
      source={props.mediaImage}
    />
    <View style={styles.levelInfo}>
      <Text style={styles.header2}>{props.name}</Text>
      {!props.value && <Text style={styles.centered, {textAlign: 'center'}}>Sin conexión con el broker</Text>}
      {props.value && <Progress.Circle showsText={true} progress={props.value} size={100} style={styles.centered, {paddingVertical:3}} color="#000"/>}
      <Text style={styles.downText}>{props.value && "Ultima vez actualizado"}</Text>
      <Text style={styles.downText}>{props.value && props.date}</Text>
    </View>
  </View>
);

let styles = StyleSheet.create({
  sensor: {
    borderRadius: 7,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downText: {
    fontSize: 15,
    textAlign: 'center'
  },
  header2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  beautyIcon: {
    height: 180,
    width: 180
  },
  levelInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  centered: {
    alignItems: 'center',
    alignContent: 'center'
  }
});

export default SensorData;