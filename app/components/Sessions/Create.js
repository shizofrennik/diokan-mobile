import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy, clearFields } from 'redux-form';
import { createSession, validateEmail } from '../../store/sessions';
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
    if(!value.users.length) {
      this.props.flash.alertWithType('info', 'Info', "To create new session, please add a client!");
      return
    }

    let userEmails = value.users.map(user => user.email),
      uniqueEmails = userEmails.filter((value, index, self) => self.indexOf(value) === index);

    this.props.validateEmail(uniqueEmails).then(isValid => {
      if(!isValid || userEmails.length > uniqueEmails.length) {
        let message = isValid ? "Only unique client emails are allowed!" : "You can't send photo session to another photographer!";
        this.props.flash.alertWithType('error', 'Error', message);
      } else {
        this.props.createSession(value).then(res => {
          if(res.create_photo_session && res.create_photo_session.id) {
            this.props.flash.alertWithType('success', 'Success', "Session was successfully created!");
            Actions.reset('app');
            this.props.destroy('sessionForm');
          }
          // Actions.replace('sessions');
        }).catch(console.log);
      }
    }).catch(() => {
      this.props.flash.alertWithType('error', 'Error', "Oops something goes wrong!");
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
    validateEmail
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Create);