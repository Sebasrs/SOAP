import React, { Component } from 'react';
import {
  View,
  FlatList,
  Button
} from 'react-native';

import HistoryEntry from '../components/HistoryEntry'
import Colors from '../constants/Colors';

const axios = require('axios');

export default class RfidHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    let items = await axios.get('http://www.mocky.io/v2/5d8ca8092e0000bdababdbcd');
    this.setState({
      dataSource: items.data,
    }); 
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View>
              <HistoryEntry
                whoCleaned={"Helga"}
                date={"25 de mayo"}
                time={"12:50 PM"}
                paper={"72%"}
                soap={"50%"}
                alcohol={"10%"}
              />
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
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
  },
};