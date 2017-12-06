import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy, clearFields } from 'redux-form';
import SessionForm from '../../components/Sessions/SessionForm';
import { Actions } from 'react-native-router-flux';

class Create extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('values from container', values);
    this.props.destroy('sessionForm');
    Actions.replace('sessions');
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <SessionForm onSubmit={this.handleSubmit} initialValues={{users: []}}/>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    destroy,
    clearFields
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Create);