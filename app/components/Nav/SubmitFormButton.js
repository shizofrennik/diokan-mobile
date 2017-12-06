import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import check from '../../assets/images/icn-check.png';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const SubmitFormButton = ({formName, submit}) => (
  <TouchableOpacity
    onPress={() => {
      submit(formName);
    }}
    style={{padding: 20, justifyContent: "center", alignItems: "center"}}>
    <Image source={check} style={{width: 24, height: 24, padding: 15, paddingRight: 5}}/>
  </TouchableOpacity>
);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    submit
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SubmitFormButton);
