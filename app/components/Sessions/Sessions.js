import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getCurrentUser} from '../../store/user'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/Common/Spinner';

class Sessions extends Component {
  constructor(props) {
    super(props);
    
  }
  
  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    let {currentUser} = this.props;
    return !currentUser.id ? <Spinner /> :
    (<View>
        <Text onPress={Actions.edit}>Sessions</Text>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
        <Text onPress={this.props.auth.logout}>Logout</Text>
      </View>)
  }
}

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.user.currentUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions)