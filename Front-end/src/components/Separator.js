import React from 'react';
import { StyleSheet, View } from 'react-native';

function Separator() {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    marginTop: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default Separator