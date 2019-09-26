import React from "react";
import { View, StyleSheet, AsyncStorage, FlatList, Modal, TouchableHighlight, Button } from "react-native";
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
    switch (direction) {
      case '/user1/weight':
        minVal = 132933;
        maxVal = 142020;
        this.setState({
          paperValue: (((maxVal - minVal) / (+value[2] - minVal)) * 100).toFixed(2),
          paperDate: date
        });
        break;
      case '/user1/ultrasonic/1':
        maxVal = 13477;
        minVal = 114007;
        this.setState({
          alcoholValue: ((maxVal - minVal) / (+value[2] - minVal)).toFixed(2),
          alcoholDate: date
        });
        break;
      case '/user1/ultrasonic/2':
        maxVal = 13477;
        minVal = 114007;
        this.setState({
          soapValue: ((maxVal - minVal) / (+value[2] - minVal)).toFixed(2),
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <Button onPress={() => { this.setModalVisible(!this.state.modalVisible) }} title={this.state.openedBy} />
        </Modal>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, item.props.name);
                }}>
                {item}
              </TouchableHighlight>
            </View>
          )}
          //Setting the number of column
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