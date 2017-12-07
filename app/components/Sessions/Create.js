import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy, clearFields } from 'redux-form';
import { createSession, validateEmail } from '../../store/sessions';
import SessionForm from '../../components/Sessions/SessionForm';
import { Actions } from 'react-native-router-flux';

class Create extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    // console.log('values from container', value);
    // this.props.destroy('sessionForm');
    // Actions.replace('sessions');

    let userEmails = value.users.map(user => user.email),
      uniqueEmails = userEmails.filter((value, index, self) => self.indexOf(value) === index);

    this.props.validateEmail(uniqueEmails).then(isValid => {
      console.log('after validation ', isValid);
      if(!isValid || userEmails.length > uniqueEmails.length) {
        let message = isValid ? "Only unique client emails are allowed!" : "You can't send photo session to another photographer!";
        console.log(message); //toastr err message
      } else {
        this.props.createSession(value).then(res => {
          console.log("Session was successfully created!"); //toastr success message
          Actions.replace('sessions');
          this.props.destroy('sessionForm');
        }).catch(console.log);
      }
    }).catch(() => toastr.error("You can't send photo session to another photographer!"));
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
    clearFields,
    createSession,
    validateEmail
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Create);