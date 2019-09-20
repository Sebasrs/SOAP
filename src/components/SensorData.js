import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SensorData = props => (
  <View style={styles.sensor}>
    <Image
      style={{width: 110, height: 110}}
      source={{uri: props.mediaImage}}
    />
    <View style={styles.column}>
      <Text style={{fontSize : 24, fontWeight:'bold'}}>{props.name}</Text>
      <Text style={{fontSize : 21}}>{props.value ? ("Nivel: " + props.value) + "%" : "Sin conexión con el broker"}</Text>
      <Text style={{fontSize : 21}}>{props.value && "Ultima vez actualizado"}</Text>
      <Text style={{fontSize : 21}}>{props.value && "2/9/2019 2:30AM"}</Text>
    </View>
  </View>
);

let styles = StyleSheet.create({
  sensor : {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding : 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'row'
  },
  column : {
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SensorData;