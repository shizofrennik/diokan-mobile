import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  WebView,
  Linking
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import logo from '../../assets/images/daiokan-logo.png';
import * as common from '../../utils/common';
import authStyles from '../../assets/styles/auth';
import {auth} from '../../containers/NavigationRouter';
import {mainColor} from '../../assets/styles/variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      submitted: false,
      spinner: false,
      authError: false,
      remember: false,
      isWebView: false,
      linkUri: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPressLink = this.onPressLink.bind(this);
    this.reloadViewOnBack = this.reloadViewOnBack.bind(this);
  }

  onPressLink(linkUri) {
    this.setState({isWebView: true, linkUri});
  }

  reloadViewOnBack() {
    this.setState({isWebView: false, linkUri: ''});
  }

  handleSubmit() {
    Keyboard.dismiss();
    this.setState({submitted: true});
    let isValidEmail = common.validateEmail(this.state.email);
    let isValidPass = common.validatePass(this.state.password);
    if (isValidEmail && isValidPass && !this.state.spinner) {
      this.setState({spinner: true});
      auth._doAuthentication(this.state.email, this.state.password, this.state.remember).then(() => {
        Actions.replace('app');
      }).catch((error) => {
        if (error['https://diokan.info/role'] && error['https://diokan.info/role'] !== 'photographer') {
          this.setState({spinner: false, error: "Please log in under daiokan photographer account!"});
        } else {
          this.setState({spinner: false, authError: true});
        }
      });
    }
  }

  renderValidationPresentErrors() {
    if (!this.state.submitted)
      return false;

    if (this.state.email != '' && this.state.password != '')
      return false;

    return (
      <View style={{padding: 10, borderRadius: 5, backgroundColor: "#D43527", marginBottom: 15}}>
        <Text style={{color: "white", textAlign: "center", fontSize: 12}}>That email / password can't be blank.</Text>
      </View>
    );
  }

  renderValidationErrors() {
    var isValidEmail = common.validateEmail(this.state.email);
    var isValidPass = common.validatePass(this.state.password);
    if (!this.state.submitted)
      return false;

    if (this.state.email == '' || this.state.password == '')
      return false;

    if (isValidEmail && isValidPass)
      return false;

    return (
      <View style={{padding: 10, borderRadius: 5, backgroundColor: "#D43527", marginBottom: 15}}>
        <Text style={{color: "white", textAlign: "center", fontSize: 12}}>That email / password combination is not valid.</Text>
      </View>
    );
  }

  renderWrongMessage() {
    if (this.state.email == '' || this.state.password == '')
      return false;

    if (!this.state.authError)
      return false;

    return (
      <View style={{padding: 10, borderRadius: 5, backgroundColor: "#D43527", marginBottom: 15}}>
        <Text style={{color: "white", textAlign: "center", fontSize: 12}}>That email / password combination is not valid.</Text>
      </View>
    );
  }

  renderErrorMessage() {
    let {error} = this.state;
    if(!error) return false;

    return (
      <View style={{padding: 10, borderRadius: 5, backgroundColor: "#D43527", marginBottom: 15}}>
        <Text style={{color: "white", textAlign: "center", fontSize: 12}}>{error}</Text>
      </View>
    )
  }

  render() {
    let { linkUri } = this.state;
    return (
      <View style={authStyles.container}>
        <View style={authStyles.centerWrapper}>
          <Image source={logo} style={authStyles.logo}/>
          {this.renderValidationPresentErrors()}
          {this.renderValidationErrors()}
          {this.renderWrongMessage()}
          {this.renderErrorMessage()}
          <TextInput
            style={authStyles.input}
            placeholderTextColor="white"
            underlineColorAndroid={mainColor}
            keyboardType="email-address"
            placeholder="Email Address"
            onChangeText={(email) => this.setState({email, authError: false, error: ''})}
            value={this.state.text}/>
          <TextInput
            style={authStyles.inputLast}
            placeholderTextColor="white"
            underlineColorAndroid={mainColor}
            placeholder="Password"
            secureTextEntry
            onChangeText={(password) => this.setState({password, authError: false, error: ''})}
            value={this.state.text}/>
          <TouchableOpacity
            onPress={() => this.setState(({remember}) => ({remember: !remember}))}
            style={{marginBottom: 17, flexDirection: "row", alignSelf: "flex-start"}}>
            <Icon
              name={this.state.remember ? "check-square-o" : "square-o"}
              size={20}
              color="#5fb8eb"
              style={{marginRight: 7, top: -1 }}/>
            <Text style={{color: "white"}}>Remember me</Text>
          </TouchableOpacity>
          <TouchableHighlight
            underlayColor="#e9eef1"
            style={authStyles.loginBtn}
            onPress={this.handleSubmit}>
            {this.state.spinner
              ? <ActivityIndicator size="small" color={mainColor}/>
              : <Text style={authStyles.loginBtnText}>Log in</Text>}
          </TouchableHighlight>
          <View style={{alignSelf: "flex-start"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <Text
                onPress={() => this.onPressLink('https://p.daiokan.com/forgot-password')}
                style={{color: "white"}}>Forgot password?</Text>
              <Text
                onPress={() => this.onPressLink('https://p.daiokan.com/photographers/signup')}
                style={{color: "white"}}>Create account</Text>
            </View>
          </View>
          { this.state.isWebView ? (
            <WebView
              source={{ linkUri }}
              onNavigationStateChange={(event) => {
                Linking.openURL(linkUri);
                this.reloadViewOnBack();
              }}
            />
          ) : null
          }
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