import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import sessionStyle from '../../assets/styles/sessions';
import {touchColor} from '../../assets/styles/variables';

const ListItem = ({item}) => {
  return (
    <TouchableHighlight underlayColor={touchColor} onPress={() => Actions.push('show', {item})}>
      <View style={sessionStyle.listElement}>
        <Text style={sessionStyle.listElementName}>{item.email}</Text>
        <Text style={sessionStyle.listElementNumbers}>{item.photosCount}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default ListItem;