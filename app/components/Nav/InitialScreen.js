import React, { Component } from 'react';
import { View, Image } from 'react-native';
import logo from '../../assets/images/daiokan-logo.png';
import authStyles from '../../assets/styles/auth';

const InitialScreen = () => (
  <View style={{flex: 1, backgroundColor: "#0788e2", justifyContent: "center", alignItems: "center"}}>
    <Image source={logo} style={authStyles.logo}/>
  </View>
);

export default InitialScreen;