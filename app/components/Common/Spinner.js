import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {mainColor} from '../../assets/styles/variables';

const Spinner = ({size = "large"}) => (
  <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <ActivityIndicator color={mainColor} size={size}/>
  </View>
);

export default Spinner;