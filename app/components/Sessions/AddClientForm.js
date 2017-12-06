import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../components/Common/InputField';
import sessionStyle from '../../assets/styles/sessions';

class AddClientForm extends Component {
  render() {
    return (
      <View>
        <View style={sessionStyle.containerAdd}>
          <Field
            name="first_name"
            label="First Name"
            component={InputField}
          />
          <View>
            <Field
              name="last_name"
              label="Last Name"
              component={InputField}
            />
          </View>
          <View>
            <Field
              name="phone"
              label="Phone Number"
              component={InputField}
            />
          </View>
          <View>
            <Field
              name="email"
              label="Email"
              component={InputField}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default reduxForm({
  form: 'addClientForm'
})(AddClientForm);