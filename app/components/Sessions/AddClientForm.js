import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import InputField from '../../components/Common/InputField';
import sessionStyle from '../../assets/styles/sessions';
import { formValidation as validation } from '../../utils/common';

class AddClientForm extends Component {
  render() {
    return (
      <View>
        <View style={sessionStyle.containerAdd}>
          <Field
            name="first_name"
            label="First Name"
            component={InputField}
            validate={[validation.alphabetic, validation.minLength(3), validation.maxLength(100) ]}
          />
          <View>
            <Field
              name="last_name"
              label="Last Name"
              component={InputField}
              validate={[validation.alphabetic, validation.minLength(3), validation.maxLength(100) ]}
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
              validate={[validation.email]}
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