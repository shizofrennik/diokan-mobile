import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, Image, TextInput, Button, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import logo from '../../assets/images/diokan-logo.png';
import * as common from '../../utils/common';
import authStyles from '../../assets/styles/auth';
import {auth} from '../../containers/NavigationRouter';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      spinner: false,
      authError: false,
      remember: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({submitted: true});
    let isValidEmail = common.validateEmail(this.state.email);
    let isValidPass = common.validatePass(this.state.password);
    if(isValidEmail && isValidPass) {
      this.setState({spinner: true});
      auth._doAuthentication(this.state.email, this.state.password, this.state.remember).then(() => {
        Actions.replace('app');
      }).catch((error) => {
        this.setState({spinner: false, authError: true});
      });
    }
  }

  render() {
    return (
      <View style={authStyles.container}>
        <View style={authStyles.centerWrapper}>
          <Image source={logo} style={authStyles.logo}/>
          <TextInput
            style={authStyles.input}
            placeholderTextColor="white"
            underlineColorAndroid="#5eb5eb"
            placeholder="Email Address"
            onChangeText={(email) => this.setState({email})}
            value={this.state.text}/>
          <TextInput
            style={authStyles.input}
            placeholderTextColor="white"
            underlineColorAndroid="#5eb5eb"
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            value={this.state.text}/>
          <TouchableHighlight
            underlayColor="#e9eef1"
            style={authStyles.loginBtn}
            onPress={this.handleSubmit}>
            <Text style={authStyles.loginBtnText}>Log in</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    currentUser: state.user.currentUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)