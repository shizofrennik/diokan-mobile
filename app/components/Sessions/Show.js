import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import sessionStyle from '../../assets/styles/sessions';

class Show extends Component {
  constructor() {
    super();

  }

  render() {
    let {item} = this.props;
    return (
      <View style={sessionStyle.showContainer}>
        <View style={sessionStyle.showHeader}>
          <Text style={sessionStyle.showHeaderTitle}>{item.email}</Text>
          <Text style={sessionStyle.showHeaderDesc}>Show {item.photosCount}</Text>
        </View>
        <View style={sessionStyle.showBody}>
          <Text>123</Text>
        </View>
      </View>
    )
  }
}

export default Show;