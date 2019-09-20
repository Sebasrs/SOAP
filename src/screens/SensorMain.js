import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import init from 'react_native_mqtt';

import SensorData from "../components/SensorData";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});
 
export default class SensorMain extends React.Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('soldier.cloudmqtt.com', 36331, 'webSocket');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.decodeMessage;

    let options = {
      useSSL : true,
      userName : "fpwzfqeg",
      password : "5ynwWEtuwmvs",
      onSuccess : this.onConnect,
      onFailure : this.doFail
    }
    
    client.connect(options);

    this.state = {
      paperValue : null,
      client,
      soapValue : null,
      alcoholValue : null
    }
  };

  onConnect = () => {
    const { client } = this.state;
    console.log("Connected");
    client.subscribe('/user1/weight');
    client.subscribe('/user1/ultrasonic/1');
    client.subscribe('/user1/ultrasonic/2');
  };
  
  doFail = () => {
    console.log("Failed");
  };
  
  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  };

  decodeMessage = message => {
    let direction = message._getDestinationName();
    let value = message._getPayloadString().split(',');
    let minVal;
    let maxVal;
    console.log(value);
    switch(direction) {
      case '/user1/weight':
        minVal = 132933;
        maxVal = 142020;
        this.setState({
          paperValue : (((maxVal - minVal)/(+value[2] - minVal))*100).toFixed(2)
        });
        break;
      case '/user1/ultrasonic/1':
        maxVal = 13477;
        minVal = 114007;
        this.setState({
          alcoholValue : ((maxVal - minVal)/(+value[2] - minVal)).toFixed(2)
        });
        break;
      case '/user1/ultrasonic/2':
        maxVal = 13477;
        minVal = 114007;
        this.setState({
          soapValue : ((maxVal - minVal)/(+value[2] - minVal)).toFixed(2)
        });
        break;
    }
  }

  renderSensorData(name, sensorValue, mediaImage) {
    return (
      <SensorData
        value={sensorValue}
        name={name}
        mediaImage={mediaImage}
      />
    );
  };

  render() {
    return (
      <View style={styles.mainWindow}>
        <View>
          {this.renderSensorData(
            "Papel Higiénico",
            this.state.paperValue,
            "https://image.flaticon.com/icons/png/512/94/94544.png"
          )}
          {this.renderSensorData(
            "Alcohol en Gel",
            this.state.alcoholValue,
            "https://diper.cl/wp-content/uploads/2017/07/Dispensador-de-jabon-espuma.png"
          )}
          {this.renderSensorData(
            "Jabón Líquido",
            this.state.soapValue,
            "http://www.marcasfamosas.com.uy/wp-content/uploads/2014/07/FD-9241.png"
          )}
        </View>
      </View>
    );
  }
}

SensorMain.navigationOptions = {
  title: 'Control de Baños'
};

let styles = StyleSheet.create({
  mainWindow : {
    flex : 1,
    justifyContent : 'center',
    flexDirection : 'column',
    alignItems : 'center',
    fontSize : 20
  }
});