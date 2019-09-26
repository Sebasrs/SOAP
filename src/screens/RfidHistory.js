import React, { Component } from 'react';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Animated
} from 'react-native';

import HistoryEntry from '../components/HistoryEntry';
import Separator from '../components/Separator';
import Colors from '../constants/Colors';

const axios = require('axios');

export default class RfidHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      loadingData: true,
      scaleValue: new Animated.Value(0)
    };
  }

  async componentDidMount() {
    let items = await axios.get('http://soa-baths.herokuapp.com/history');
    this.setState({
      dataSource: items.data,
      loadingData: false
    });
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration : 600,
    }).start();
  } 
 
  render() {
    return (
      <View style={{flex:1}}>
        {this.state.loadingData && <ActivityIndicator size="large" color="#000" style={styles.ActivityIndicator} />}
        {!this.state.loadingData
        &&
        <Animated.FlatList
          style={{opacity: this.state.scaleValue}}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <HistoryEntry
                whoCleaned={item.employeeName}
                date={item.date}
                time={item.hour}
                paper={item.paper}
                soap={item.soap}
                alcohol={item.alcohol}
              />
              <Separator/>
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />}
      </View>
    );
  }
}

RfidHistory.navigationOptions = {
  title: 'Historial',
  headerRight: (
    <Button
      onPress={ () => { alert("Actualizar") } }
      title="Actualizar"
      color="#000"
    />
  ),
  headerStyle: {
    backgroundColor: Colors.tabBar,
  },
  headerTintColor: Colors.tintColor,
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 25
  }
};

let styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
  }
});