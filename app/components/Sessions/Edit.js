import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Edit extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
        <Text style={{fontSize: 22, marginBottom: 30, color: "black"}}>Edit Session</Text>
        <Text onPress={this.props.auth.logout}>Logout</Text>
      </View>
    )
  }
}

export default Edit;