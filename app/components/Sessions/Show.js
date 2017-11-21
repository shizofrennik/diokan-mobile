import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import sessionStyle from '../../assets/styles/sessions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {secondaryTextColor, touchColor} from '../../assets/styles/variables';
import moment from 'moment';
import {getClientName} from '../../utils/common';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Show extends Component {
  constructor() {
    super();

  }

  getMenu() {
    return (
      <View style={{width: 195, paddingVertical: 5, backgroundColor: "white", position: "absolute", top: 0, right: 5, elevation: 5, borderRadius: 5}}>
        <TouchableHighlight underlayColor={touchColor} onPress={Actions.edit} style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Edit Session</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={touchColor} onPress={Actions.createSession} style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Delete Session</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    let {session, showMenu, selected} = this.props;
    return (
      <ScrollView style={sessionStyle.showContainer}>
        <View style={sessionStyle.showHeader}>
          <Text style={sessionStyle.showHeaderTitle}>{getClientName(session.users[0], session.name)}</Text>
          <Text style={sessionStyle.showHeaderDesc}>{(session.photo_start && session.photo_end) ? `#${session.photo_start}-${session.photo_end}` : ""}</Text>
          {showMenu && this.getMenu()}
        </View>
        <View style={sessionStyle.showBody}>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="calendar" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{moment(session.date).format('DD-MMM-YYYY')}</Text>
            </View>
          </View>
          <View style={sessionStyle.showListElement}>
            <View  style={sessionStyle.showListContentIcon}>
              <Icon name="map-marker" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{session.location ? session.location : "N/A"}</Text>
            </View>
          </View>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="envelope" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{(session.users.length && session.users[0].email) ? session.users[0].email : "N/A"}</Text>
            </View>
          </View>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon}>
              <Icon name="phone" size={22} color={secondaryTextColor}/>
            </View>
            <View style={sessionStyle.showListContent}>
              <Text style={sessionStyle.showListContentText}>{(session.users.length && session.users[0].phone) ? session.users[0].phone : "N/A"}</Text>
            </View>
          </View>
          <View style={sessionStyle.showListElement}>
            <View style={sessionStyle.showListContentIcon} />
            <View style={sessionStyle.showListContent}>
              <Text style={(session.status === 'created') ? sessionStyle.showListTextPrimary : sessionStyle.showListTextSuccess}>
                {(session.status === 'created') ? 'Upload photos' : 'Photos sent to client'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    selected: state.sessions.selectedSession,
    showMenu: state.sessions.showControls
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
