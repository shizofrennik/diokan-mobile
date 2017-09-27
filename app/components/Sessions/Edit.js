import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Edit extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View>
        <Text onPress={Actions.login}>Edit Sessions</Text>
      </View>
    )
  }
}

export default Edit;