import React from "react";
import { View, StyleSheet, AsyncStorage, FlatList, Modal, TouchableOpacity, Button } from "react-native";
import init from 'react_native_mqtt';
import Images from '../constants/Images';
import Colors from '../constants/Colors';

import SensorData from "../components/SensorData";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {
  }
});

export default class SensorMain extends React.Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('soldier.cloudmqtt.com', 36331, 'webSocket');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.decodeMessage;

    let options = {
      useSSL: true,
      userName: "fpwzfqeg",
      password: "5ynwWEtuwmvs",
      onSuccess: this.onConnect,
      onFailure: this.doFail
    }

    client.connect(options);

    this.state = {
      paperValue: null,
      client,
      soapValue: null,
      alcoholValue: null,
      dataSource: {},
      modalVisible: false,
      openedBy: null,
    }
  };

  setModalVisible(visible, openedBy) {
    this.setState({
      modalVisible: visible,
      openedBy
    });
  }

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
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  };

  decodeMessage = message => {
    let direction = message._getDestinationName();
    let value = message._getPayloadString().split(',');
    let date = value[0] + " " + value[1];
    let minVal;
    let maxVal;
    let valueCheck;
    switch (direction) {
      case '/user1/weight':
        minVal = 134128;
        maxVal = 143350;
        valueCheck = (+value[2] - minVal)/(maxVal - minVal);
        valueCheck = (valueCheck < 0) ? 0.001 : valueCheck;
        if(valueCheck > 1){
          valueCheck = 0.999
        }
        this.setState({
          paperValue: valueCheck,
          paperDate: date
        });
        break;
      case '/user1/ultrasonic/1':
        maxVal = 15;
        minVal = 2;
        valueCheck = Math.abs(1 - ((+value[2] - minVal)/(maxVal - minVal)));
        valueCheck = (valueCheck < 0) ? 0.001 : valueCheck;
        if(valueCheck > 1){
          valueCheck = 0.999
        }
        this.setState({
          alcoholValue: valueCheck,
          alcoholDate: date
        });
        break;
      case '/user1/ultrasonic/2':
        maxVal = 15;
        minVal = 2;
        valueCheck = Math.abs(1 - ((+value[2] - minVal)/(maxVal - minVal)));
        valueCheck = (valueCheck < 0) ? 0.001 : valueCheck;
        if(valueCheck > 1){
          valueCheck = 0.999
        }
        this.setState({ 
          soapValue: valueCheck,
          soapDate: date
        });
        break;
    }
  }

  renderSensorData(name, sensorValue, mediaImage, date) {
    return (
      <SensorData
        value={sensorValue}
        name={name}
        mediaImage={Images.BathIcons[mediaImage]}
        date={date}
      />
    );
  };

  render() {
    let items = [
      this.renderSensorData(
        "Jabón Líquido",
        this.state.soapValue,
        "soap",
        this.state.soapDate
      ),
      this.renderSensorData(
        "Alcohol en Gel",
        this.state.alcoholValue,
        "alcohol",
        this.state.alcoholDate
      ),
      this.renderSensorData(
        "Papel Higiénico",
        this.state.paperValue,
        "toiletPaper",
        this.state.paperDate
      )
    ]
    return (
      <View style={styles.mainWindow}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              {item}
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

SensorMain.navigationOptions = {
  title: 'Control de Baños',
  headerStyle: {
    backgroundColor: Colors.tabBar,
  },
  headerTintColor: Colors.tintColor,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 25
  },
};

let styles = StyleSheet.create({
  mainWindow: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    flex: 1,
  }
});