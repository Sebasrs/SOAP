/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
//import all the components we will need
import Images from '../constants/Images';

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
    paddingTop: 20
  },
  imageThumbnail: {
    height: 200,
    width: 200
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    maxWidth:'50%'
  },
  description: {
    fontWeight: 'bold',
    fontSize: 15
  }
});