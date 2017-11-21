import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import sessionStyle from '../../assets/styles/sessions';
import {touchColor} from '../../assets/styles/variables';
import {getClientName} from '../../utils/common';
import {setSelectedSession} from '../../store/sessions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ListItem extends Component {
  render() {
    let {session, setSelectedSession} = this.props;

    return (
      <TouchableHighlight 
        underlayColor={touchColor} 
        onPress={() => {
          setSelectedSession(session);
          Actions.push('show', {session});
        }
      }>
        <View style={sessionStyle.listElement}>
          <Text style={sessionStyle.listElementName}>{getClientName(session.users[0], session.name)}</Text>
          <Text style={sessionStyle.listElementNumbers}>
            {(session.status === 'created') ? 'Upload photos' : 'Photos sent to client'}&nbsp;
            {(session.photo_start && session.photo_end) ? `#${session.photo_start}-${session.photo_end}` : ''}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({})
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSelectedSession
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)