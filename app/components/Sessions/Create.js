import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy, clearFields } from 'redux-form';
import { createSession, validateEmail, getSessions } from '../../store/sessions';
import SessionForm from '../../components/Sessions/SessionForm';
import { Actions } from 'react-native-router-flux';

class Create extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.destroy('sessionForm');
  }
  
  handleSubmit(value) {
    let {flash, getSessions, createSession, destroy, validateEmail} = this.props;
    if(!value.users.length) {
      if(flash) flash.alertWithType('info', 'Info', "To create new session, please add a client!");
      return
    }

    let userEmails = value.users.map(user => user.email),
      uniqueEmails = userEmails.filter((value, index, self) => self.indexOf(value) === index);

    validateEmail(uniqueEmails).then(isValid => {
      if(!isValid || userEmails.length > uniqueEmails.length) {
        let message = isValid ? "Only unique client emails are allowed!" : "You can't send photo session to another photographer!";
        if(flash) flash.alertWithType('error', 'Error', message);
      } else {
        return createSession(value).then(res => {
          if(res.create_photo_session && res.create_photo_session.id) {
            if(flash) flash.alertWithType('success', 'Success', "Session was successfully created!");
            getSessions().then(() => {
              Actions.popTo('sessions');
              destroy('sessionForm');
            });
          }
        });
      }
    }).catch(() => {
      if(flash) flash.alertWithType('error', 'Error', "Oops something goes wrong!");
    });
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <SessionForm onSubmit={this.handleSubmit} indexPage="createSession" initialValues={{users: []}}/>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    destroy,
    clearFields,
    createSession,
    validateEmail,
    getSessions
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Create);