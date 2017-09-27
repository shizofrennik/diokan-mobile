import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Show extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View>
        <Text onPress={Actions.edit}>Show</Text>
      </View>
    )
  }
}

export default Show;