import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SensorData = props => (
  <View style={styles.sensor}>
    <Image
      style={styles.beautyIcon}
      source={props.mediaImage}
    />
    <View style={styles.levelInfo}>
      <Text style={styles.header2}>{props.name}</Text>
      <Text style={styles.downText}>{props.value ? ("Nivel: " + props.value) + "%" : "Sin conexión con el broker"}</Text>
      <Text style={styles.downText}>{props.value && "Ultima vez actualizado"}</Text>
      <Text style={styles.downText}>{props.value && props.date}</Text>
    </View>
  </View>
);

let styles = StyleSheet.create({
  sensor: {
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downText: {
    fontSize: 15
  },
  header2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  beautyIcon: {
    height: 200,
    width: 200
  },
  levelInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center'
  }
});

export default SensorData;