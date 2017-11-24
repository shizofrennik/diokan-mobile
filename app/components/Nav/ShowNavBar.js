import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight, Platform, Alert } from 'react-native';
import sessionStyle from '../../assets/styles/sessions';
import appStyles from '../../assets/styles/app';
import {mainColor, touchColor} from '../../assets/styles/variables';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getClientName} from '../../utils/common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {toggleShowControls, setShowControls, destroySession} from '../../store/sessions';
import backIcon from '../../assets/images/icn-back-android.png';

class ShowNavBar extends Component {
  constructor() {
    super();

    this.deleteModal = this.deleteModal.bind(this);
  }

  deleteModal() {
    let {session, destroySession} = this.props;
    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this session?',
      [
        {text: 'Cancel', onPress: () => {}, style: "cancel"},
        {text: 'Delete', onPress: () => {
          destroySession(session.id).then(Actions.sessions);
        }}
      ],
      { cancelable: false }
    )
  }

  getMenu() {
    let { setShowControls, session } = this.props;
    return (
      <View style={appStyles.customHeaderDropDown}>
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            Actions.edit()
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Edit Session</Text>
        </TouchableHighlight>
        {session.status === "created" &&
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            this.deleteModal();
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Delete Session</Text>
        </TouchableHighlight>}
      </View>
    )
  }

  render() {
    let {session, showMenu, toggleShowControls, selected} = this.props;

    return (
      <View style={appStyles.customHeaderBody}>
        <View style={appStyles.customHeader}>
          <TouchableHighlight
            underlayColor={mainColor}
            onPress={Actions.pop}
            style={appStyles.customHeaderLeftIcon}>
            {Platform.OS === 'ios' ?
              <Icon style={{paddingTop: 10, paddingLeft: 0}} name="chevron-left" color="white" size={22} /> :
              <Image source={backIcon} style={{width: 24, height: 24}}/>}
          </TouchableHighlight>
          <TouchableHighlight
            style={appStyles.customHeaderRightIcon}
            underlayColor={mainColor}
            onPress={toggleShowControls}>
            <Icon name="ellipsis-v" color="white" size={22} />
          </TouchableHighlight>
        </View>
        <View style={sessionStyle.showHeader}>
          <Text style={sessionStyle.showHeaderTitle}>{getClientName(session.users[0], session.name)}</Text>
          <Text style={sessionStyle.showHeaderDesc}>{(session.photo_start && session.photo_end) ? `#${session.photo_start}-${session.photo_end}` : ""}</Text>
          {showMenu && this.getMenu()}
        </View>
      </View>
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
  return bindActionCreators({
    toggleShowControls,
    setShowControls,
    destroySession
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNavBar)
