import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight, Platform } from 'react-native';
import sessionStyle from '../../assets/styles/sessions';
import appStyles from '../../assets/styles/app';
import {mainColor, touchColor} from '../../assets/styles/variables';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getClientName} from '../../utils/common';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {toggleShowControls, setShowControls} from '../../store/sessions';
import backIcon from '../../assets/images/icn-back-android.png';

class ShowNavBar extends Component {
  getMenu() {
    let { setShowControls } = this.props;
    return (
      <View style={appStyles.customHeaderBody}>
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            Actions.edit()
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Edit Session</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={touchColor}
          onPress={() => {
            setShowControls(false);
            Actions.createSession()
          }}
          style={{padding: 15}}>
          <Text style={{fontSize: 16, color: "black"}}>Delete Session</Text>
        </TouchableHighlight>
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
    setShowControls
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNavBar)
