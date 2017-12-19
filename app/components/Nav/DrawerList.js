import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import {auth} from '../../containers/NavigationRouter';
import Icon from 'react-native-vector-icons/FontAwesome';
import {mainColor, mainTextColor, secondaryTextColor} from '../../assets/styles/variables';
import sessionStyle from '../../assets/styles/sessions';
import { Actions } from 'react-native-router-flux';

class DrawerList extends Component {
  render() {
    let {user} = this.props;
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <View style={{flex: 1, backgroundColor: mainTextColor, padding: 16, paddingTop: 25}}>
          <View style={{paddingVertical: 16}}>
            <Icon name="user-circle-o" size={50} color={mainColor}/>
          </View>
          <Text style={{color: "white", fontSize: 14, fontWeight: "bold"}}>{user.name}</Text>
          <Text style={{color: "white", fontSize: 14}}>{user.email}</Text>
        </View>
        <View style={{flex: 4}}>
          <TouchableOpacity activeOpacity={0.7} style={sessionStyle.showListElement} onPress={Actions.sessions}>
            <View  style={sessionStyle.showListContentIcon}>
              <Icon name="camera-retro" size={22} color={mainColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={{fontSize: 14, color: mainColor}}>Sessions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={sessionStyle.showListElement} onPress={auth.logout}>
            <View  style={sessionStyle.showListContentIcon}>
              <Icon name="power-off" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={{fontSize: 14, color: secondaryTextColor}}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return ({
    user: state.user.currentUser,
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerList)
