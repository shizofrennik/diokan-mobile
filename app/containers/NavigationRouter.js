import React from 'react';
import { Scene, Router, Tabs, Lightbox, Stack, Drawer } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import Login from '../components/Auth/Login';
import Edit from '../components/Sessions/Edit';
import Show from '../components/Sessions/Show';
import Create from '../components/Sessions/Create';
import AddClient from '../components/Sessions/AddClient';
import ShowNavBar from '../components/Nav/ShowNavBar';
import Sessions from '../components/Sessions/Sessions';
import DrawerList from '../components/Nav/DrawerList';
import InitialScreen from '../components/Nav/InitialScreen';
import SubmitFormButton from '../components/Nav/SubmitFormButton';
import { Actions } from 'react-native-router-flux';
import AuthService from '../utils/AuthService';
import styles from '../assets/styles/app';
import {isTokenExpired} from '../utils/jwtHelper';

export const requireAuth = () => {
  auth.loggedIn().then(logged => {
    if(!logged) {
      Actions.replace('login');
    }
  })
}

export const initialRedirect = async () => {
  auth.loggedIn().then(logged => {
    if(logged) {
      Actions.replace('app');
    } else {
      Actions.replace('login');
    }
  });
}

export const isLoggedIn = async () => {
  auth.loggedIn().then(logged => {
    if(logged) {
      Actions.replace('app');
    }
  });
}

export const auth = new AuthService('diWSD6yI7yUkv6lzDaf4l8j0WE34B30S', 'dmkryhtin.auth0.com');

class NavigationRouter extends React.Component {
  componentWillMount() {
    auth.getRefreshToken().then(refreshToken => {
      return auth.getToken().then(token => {
        if(refreshToken && isTokenExpired(token)) auth.renew();
      });
    }).catch(console.log);
  }

  //@todo check flash messages
  render() {
    return (
      <Router auth={auth} flash={this.props.flash}>
        <Scene key="root" hideNavBar navigationBarStyle={styles.header} navBarButtonColor="white" titleStyle={styles.headerTitle}>
          <Scene key="initial" initial component={InitialScreen} onEnter={initialRedirect}/>
          <Scene key="login" title="Log in" component={Login} onEnter={isLoggedIn}/>
          <Scene key="app" onEnter={requireAuth} flash={this.props.flash}>
            <Scene key="sessions" initial component={Sessions} title="Sessions" onEnter={requireAuth}/>
            <Scene key="edit" component={Edit} title="Edit Session" onEnter={requireAuth}/>
            <Scene key="createSession" component={Create} title="Add Session" flash={this.props.flash} renderRightButton={() => <SubmitFormButton formName="sessionForm" />} onEnter={requireAuth}/>
            <Scene key="addClient" component={AddClient} title="Add Client" flash={this.props.flash} renderRightButton={() => <SubmitFormButton formName="addClientForm" />} onEnter={requireAuth}/>
            <Scene key="show" navBar={ShowNavBar} component={Show} onEnter={requireAuth}/>
          </Scene>
        </Scene>
      </Router>
    );
  }
  
};

export default NavigationRouter;
