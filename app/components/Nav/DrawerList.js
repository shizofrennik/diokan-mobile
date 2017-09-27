import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class DrawerList extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View>
        <Text onPress={Actions.sessions}>DrawerList page</Text>
      </View>
    )
  }
}

export default DrawerList;
