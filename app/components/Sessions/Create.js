import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Create extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View>
        <Text onPress={Actions.edit}>Create</Text>
      </View>
    )
  }
}

export default Create;