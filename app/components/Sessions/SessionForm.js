import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import InputField from '../../components/Common/InputField';
import DateField from '../../components/Common/DateField';
import UsersField from '../../components/Common/UsersField';
import { Actions } from 'react-native-router-flux';
import sessionStyle from '../../assets/styles/sessions';
import inputsStyle from '../../assets/styles/inputs';
import { formValidation as validation } from '../../utils/common';

class SessionForm extends Component {

  renderButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={Actions.addClient}
        style={sessionStyle.button}>
        <Text style={{color: "white"}}>Add Clients</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let values;
    if(this.props.form) values = this.props.form.values;
    return (
      <ScrollView style={{backgroundColor: "white"}}>
        <View style={sessionStyle.containerAdd}>
          <Field
            name="name"
            label="Session name"
            component={InputField}
            validate={[validation.alphaNumeric]}
          />
          <View>
            <Field
              name="date"
              label="Date"
              component={DateField}
            />
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Field
              width="47%"
              name="photo_start"
              label="Photo Start #"
              keyboardType="numeric"
              component={InputField}
              validate={[validation.number]}
            />
            <Field
              width="47%"
              name="photo_end"
              label="Photo End #"
              keyboardType="numeric"
              component={InputField}
              validate={[validation.number]}
            />
          </View>
          <View>
            <Field
              name="location"
              customStyles={inputsStyle.inputLastChild}
              label="Location (optional)"
              component={InputField}
            />
          </View>
        </View>
        {!(values && values.users.length) && this.renderButton()}
        {!!(values && values.users.length) &&
        <View style={{backgroundColor: "#e9eef1", marginTop: 10, paddingVertical: 10, paddingHorizontal: 16}}>
          <Text style={{color: "black"}}>Contacts</Text>
        </View>}
        {!!(values && values.users.length) && <FieldArray name="users" component={UsersField}/>}
        {!!(values && values.users.length) && this.renderButton()}
      </ScrollView>
    )
  }
}


const mapStateToProps = (state, props) => {
  return ({
    form: state.form.sessionForm
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

SessionForm = connect(mapStateToProps, mapDispatchToProps)(SessionForm);

export default reduxForm({
  form: 'sessionForm',
  destroyOnUnmount: false
})(SessionForm);