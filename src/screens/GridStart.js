import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
import { Header } from 'react-native-elements';

import Images from '../constants/Images';
import Colors from '../constants/Colors';

export default class GridStart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(1)).map((v, i) => {
      return { id: i };
    });
    that.setState({
      dataSource: items,
    });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Header
          centerComponent={{ text: 'Bienvenido', style: { color: '#000', fontSize: 25, fontWeight: 'bold' }}}
          barStyle = { 'dark-content' }
          backgroundColor = { "#fefefe" }
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableHighlight onPress={() => { this.props.navigation.navigate("Main") }}>
                <Image style={styles.imageThumbnail} source={Images.BathIcons.toilet} />
              </TouchableHighlight>
              <Text style={styles.description}>Control de baños</Text>
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

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  imageThumbnail: {
    height: 200,
    width: 200
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    maxWidth: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 15
  }
});