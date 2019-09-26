import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Animated
} from 'react-native';
import * as Progress from 'react-native-progress';

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

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Historial',
      headerRight: (
        <Button
          onPress={ navigation.getParam('updateList') }
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
    }
  };

  async componentDidMount() {
    let items = await axios.get('http://soa-baths.herokuapp.com/history');
    this.setState({
      dataSource: items.data.reverse(),
      loadingData: false
    });
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration : 600,
    }).start();
    this.props.navigation.setParams({updateList: this._updateList})
  }

  _updateList = () => {
    this.setState({
      loadingData: true,
      scaleValue: new Animated.Value(0)
    })
    axios.get('http://soa-baths.herokuapp.com/history').then((response) =>{
      let items = response;
      this.setState({
        dataSource: items.data.reverse(),
        loadingData: false
      });
      Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration : 600,
      }).start();
    });
  }
 
  render() {
    return (
      <View style={{flex:1}}>
        {this.state.loadingData && <Progress.Circle size={120} indeterminate={true} style={styles.activityIndicator} color={'#000'} />}
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

let styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000'
  }
});