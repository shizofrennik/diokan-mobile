import React, { Component } from 'react';
import { View, Text, FlatList, SectionList, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getCurrentUser} from '../../store/user'
import {getSessions, sortSessionByDate} from '../../store/sessions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../../components/Common/Spinner';
import ListItem from './ListItem';
import sessionStyle from '../../assets/styles/sessions';
import add from '../../assets/images/icn-add-session.png';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true
    }
  }
  
  componentWillMount() {
    let {getCurrentUser, getSessions} = this.props;
    Promise.all([
      getCurrentUser(), 
      getSessions()
    ]).then(() => this.setState({fetchingData: false})).catch(console.log);
  }

  render() {
    let {sessions, sortedSessions} = this.props;
    return this.state.fetchingData ? <Spinner /> :
      (<View style={{flex: 1, backgroundColor: "white"}}>
        {!sessions.length
        ? (<View style={{flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24}}>Sorry, You have no sessions!</Text>
          </View>)
        : (<SectionList
            sections={sortedSessions}
            keyExtractor={item => item.id}
            renderSectionHeader={({section}) => (section.data.length
                                                ? (<View style={{backgroundColor: "#e9eef1", paddingVertical: 10, paddingHorizontal: 16}}>
                                                  <Text style={{color: "black", fontSize: 16}}>{section.title}</Text>
                                                </View>) : null)}
            renderItem={({item}) => <ListItem onPress={Actions.edit} session={item}/>}/>)}
        <TouchableOpacity
          activeOpacity={0.7}
          style={sessionStyle.addBtn}
          onPress={() => Actions.push('createSession', {flash: this.props.flash})}>
          <Image style={{width: 22, height: 22}} source={add}/>
        </TouchableOpacity>
      </View>)
  }
}

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.user.currentUser,
    sessions: state.sessions.sessions,
    sortedSessions: sortSessionByDate(state.sessions.sessions),
    filters: state.sessions.filters,
    fetching: state.sessions.fetchingSessions,
    count: state.sessions.total_count,
    pagination: state.sessions.pagination
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUser,
    getSessions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions)