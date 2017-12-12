import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import inputsStyle from '../../assets/styles/inputs';
import {errorDarkColor} from '../../assets/styles/variables';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

const UsersField = ({deleteUser, fields, meta: {error}}) => {
  
  const handleDelete = (index) => {
    let contact = fields.get(index);
    if(contact && contact.id) {
      deleteUser(contact.id).then(() => {
        fields.remove(index);
        if(fields.length === 1) fields.push();
      });
    } else {
      fields.remove(index);
    }
  };

  const getDeleteButton = (index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleDelete(index)}
        style={{backgroundColor: errorDarkColor, flex: 1, justifyContent: "center", alignItems: "flex-start", padding: 25}}>
        <Icon name="trash" size={22} color="white" />
      </TouchableOpacity>
    )
  }

  let getFields = () => {
    return fields.map((contact, index) => {
      return (
        <Swipeable key={fields.get(index).email+index} rightButtons={[getDeleteButton(index)]}>
          <View style={inputsStyle.userField}>
            <Text style={inputsStyle.textField}>{fields.get(index).first_name ? fields.get(index).first_name : "Client"}</Text>
            <Text style={inputsStyle.secondaryFont}>{fields.get(index).email}</Text>
          </View>
        </Swipeable>
      )
    })
  }
  
  return (
    <View>
      {getFields()}
    </View>
  );
}

export default UsersField;