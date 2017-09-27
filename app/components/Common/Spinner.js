import React, { Component } from 'react';
import { View, Text } from 'react-native';

const Spinner = () => (
  <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <Text>Loading...</Text>
  </View>
);

export default Spinner;