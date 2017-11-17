import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getCurrentUser} from '../../store/user'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/Common/Spinner';
import ListItem from './ListItem';
import sessionStyle from '../../assets/styles/sessions';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{key: "1", email: "John Doe", photosCount: "Upload photos #513 - 543"}, {key: "2", email: "Jennifer Quinn", photosCount: "Upload photos #502 - 512"}, {key: "3", email: "Aneeta Armstead", photosCount: "Photos sent to client #485 - 501"},{key: "4", email: "John Doe", photosCount: "Upload photos #513 - 543"}, {key: "5", email: "Jennifer Quinn", photosCount: "Upload photos #502 - 512"}, {key: "6", email: "Aneeta Armstead", photosCount: "Photos sent to client #485 - 501"}, {key: "7", email: "John Doe", photosCount: "Upload photos #513 - 543"}, {key: "8", email: "Jennifer Quinn", photosCount: "Upload photos #502 - 512"}, {key: "9", email: "Aneeta Armstead", photosCount: "Photos sent to client #485 - 501"},{key: "10", email: "John Doe", photosCount: "Upload photos #513 - 543"}, {key: "11", email: "Jennifer Quinn", photosCount: "Upload photos #502 - 512"}, {key: "12", email: "Aneeta Armstead", photosCount: "Photos sent to client #485 - 501"}]
    }
  }
  
  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    let {currentUser} = this.props;
    return !currentUser.id ? <Spinner /> :
    // (<View>
    //     <Text onPress={Actions.edit}>Sessions</Text>
    //     <Text>{currentUser.name}</Text>
    //     <Text>{currentUser.email}</Text>
    //     <Text onPress={this.props.auth.logout}>Logout</Text>
    //   </View>)
      (<View>
        <FlatList data={this.state.list} renderItem={({item}) => <ListItem button key={item.id} onPress={Actions.edit} item={item}/>}/>
        <TouchableHighlight
          style={sessionStyle.addBtn}
          onPress={Actions.edit}>
          <Text style={sessionStyle.addBtnText}>+</Text>
        </TouchableHighlight>
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