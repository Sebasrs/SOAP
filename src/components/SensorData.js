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
    borderRadius: 7,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
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
  }
});

export default SensorData;