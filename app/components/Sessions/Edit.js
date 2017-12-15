import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SessionForm from '../../components/Sessions/SessionForm';
import { updateSession, validateEmail } from '../../store/sessions';
import { destroy, clearFields } from 'redux-form';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.destroy('sessionForm');
  }

  handleSubmit(value) {
    let {flash, updateSession, validateEmail} = this.props;
    delete value.session_photos;
    delete value.status;
    
    let userEmails = value.users.map(user => user.email),
      uniqueEmails = userEmails.filter((value, index, self) => self.indexOf(value) === index);

    validateEmail(uniqueEmails).then(isValid => {
      if(!isValid || userEmails.length > uniqueEmails.length) {
        let message = isValid ? "Only unique client emails are allowed!" : "You can't send photo session to another photographer!";
        flash.alertWithType('error', 'Error', message);
      } else {
        updateSession(value).then(res => {
          if(res.data.photographer_photo_session && res.data.photographer_photo_session.id) {
            flash.alertWithType('success', 'Success', "Session was successfully updated!");
            Actions.popTo('show');
            this.props.destroy('sessionForm');
          }
        }).catch(console.log);
      }
    }).catch(() => {
      flash.alertWithType('error', 'Error', "Oops something goes wrong!");
    });
  }

  render() {
    let {session} = this.props;
    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <SessionForm onSubmit={this.handleSubmit} indexPage="edit" initialValues={session}/>
        {/*<Text onPress={this.props.auth.logout}>Logout</Text>*/}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    session: state.sessions.selectedSession
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    destroy,
    clearFields,
    updateSession,
    validateEmail
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
