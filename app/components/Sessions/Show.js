import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import sessionStyle from '../../assets/styles/sessions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {secondaryTextColor} from '../../assets/styles/variables';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Show extends Component {
  constructor() {
    super();

  }

  render() {
    let {session} = this.props;
    return (
      <ScrollView style={sessionStyle.showContainer}>
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
  return ({})
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
