import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { arrayPush } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import AddClientForm from '../../components/Sessions/AddClientForm';

class AddClient extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    this.props.arrayPush('sessionForm', 'users', value);
    Actions.popTo('createSession');
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <AddClientForm onSubmit={this.handleSubmit}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({})
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    arrayPush
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient);