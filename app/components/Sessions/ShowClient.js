import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { getClientName } from '../../utils/common';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import sessionStyle from '../../assets/styles/sessions';
import {secondaryTextColor} from '../../assets/styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class ShowClient extends Component {
  render() {
    let {user} = this.props;
    return (
      <ScrollView style={sessionStyle.showContainer}>
        <View style={[sessionStyle.showBody, {paddingTop: 0}]}>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="user-circle" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{getClientName(user)}</Text>
            </View>
          </View>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="envelope" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{user.email}</Text>
            </View>
          </View>
          {!!user.phone &&
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="phone" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{user.phone}</Text>
            </View>
          </View>}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({})
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowClient);