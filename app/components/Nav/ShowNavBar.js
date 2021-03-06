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
import {toggleShowControls, setShowControls, destroySession, getSessions} from '../../store/sessions';
import backIcon from '../../assets/images/icn-back-android.png';

class ShowNavBar extends Component {
  constructor(props) {
    super(props);

    this.deleteModal = this.deleteModal.bind(this);
  }

  deleteModal() {
    let {session, destroySession, getSessions, flash} = this.props;
    Alert.alert(
      'Delete Session',
      'Are you sure you want to delete this session?',
      [
        {text: 'Cancel', onPress: () => {}, style: "cancel"},
        {text: 'Delete', onPress: () => {
          destroySession(session.id).then(() => {
            flash.alertWithType('success', 'Success', "Session was successfully deleted!");
            return getSessions().then(() => {
              Actions.popTo('sessions')
            })
          }).catch(err => {
            flash.alertWithType('error', 'Error', "Oops something goes wrong!");
          });
        }}
      ],
      { cancelable: false }
    )
  }

  getMenu() {
    let { setShowControls, session, flash } = this.props;
    return (session.status === "created")
    ? (
      <View style={appStyles.customHeaderDropDown}>
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            Actions.edit({flash})
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Edit Session</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            this.deleteModal();
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Delete Session</Text>
        </TouchableHighlight>
      </View>
    ) : null
  }

  render() {
    let {session, showMenu, toggleShowControls} = this.props;
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
          {session.status === "created" &&
          <TouchableHighlight
            style={appStyles.customHeaderRightIcon}
            underlayColor={mainColor}
            onPress={toggleShowControls}>
            <Icon name="ellipsis-v" color="white" size={22} />
          </TouchableHighlight>}
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
    session: state.sessions.selectedSession,
    showMenu: state.sessions.showControls
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleShowControls,
    setShowControls,
    destroySession,
    getSessions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNavBar)
