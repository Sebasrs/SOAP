import React from "react";
import { Text, Button, View } from "react-native";

export default function Rfid(props) {
  return (
    <View>
      <Text>Hola</Text>
      <Button
        title="Historial completo"
        onPress={() => props.navigation.navigate("Historial")}
      />
    </View>
  )
}

Rfid.navigationOptions = {
  title: 'Ultima limpieza'
};