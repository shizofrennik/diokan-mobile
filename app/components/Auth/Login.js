import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, Text, Image, TextInput, Button, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';
import logo from '../../assets/images/diokan-logo.png';
import * as common from '../../utils/common';

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
      this.props.auth._doAuthentication(this.state.email, this.state.password, this.state.remember).then(() => {
        Actions.replace('app');
      }).catch((error) => {
        this.setState({spinner: false, authError: true});
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#0788e2", justifyContent: "center"}}>
        <View style={{alignItems: "center", marginHorizontal: 40}}>
          <Image source={logo} style={{width: "80%", resizeMode: "contain", marginBottom: 50}}/>
          <TextInput
            style={{width: "100%", marginBottom: 20, fontSize: 16, color: "#fff"}}
            placeholderTextColor="white"
            underlineColorAndroid="#5eb5eb"
            placeholder="Email Address"
            onChangeText={(email) => this.setState({email})}
            value={this.state.text}/>
          <TextInput
            style={{width: "100%", marginBottom: 20, fontSize: 16, color: "#fff"}}
            placeholderTextColor="white"
            underlineColorAndroid="#5eb5eb"
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => this.setState({password})}
            value={this.state.text}/>
          <TouchableHighlight
            underlayColor="#e9eef1"
            style={{width: "100%", backgroundColor: "white", padding: 15, borderRadius: 3}}
            onPress={this.handleSubmit}>
            <Text style={{color: "#12a3e1", fontSize: 16, textAlign: "center"}}>Log in</Text>
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