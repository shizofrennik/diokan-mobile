import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {mainColor} from '../../assets/styles/variables';

const Spinner = () => (
  <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <ActivityIndicator color={mainColor} size="large"/>
  </View>
);

export default Spinner;