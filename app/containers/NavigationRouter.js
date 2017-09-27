import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Tabs, Lightbox, Stack, Drawer } from 'react-native-router-flux';
import Login from '../components/Auth/Login';
import Edit from '../components/Sessions/Edit';
import Sessions from '../components/Sessions/Sessions';
import DrawerList from '../components/Nav/DrawerList';
import InitialScreen from '../components/Nav/InitialScreen';
import { Actions } from 'react-native-router-flux';
import AuthService from '../utils/AuthService';

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

const NavigationRouter = () => {
  const initialKey = props => props.users.session ? 'authorized' : 'guest';
  return (
    <Router auth={auth}>
      <Scene key="root" hideNavBar>
        <Scene key="initial" initial component={InitialScreen} onEnter={initialRedirect}/>
        <Scene key="login" title="Log in" component={Login} onEnter={isLoggedIn}/>
        <Scene key="app" title="Diokan" onEnter={requireAuth}>
          <Scene key="sessions" initial component={Sessions} title="Sessions" onEnter={requireAuth}/>
          <Scene key="edit" component={Edit} title="Edit session" onEnter={requireAuth}/>
        </Scene>
        {/*<Scene key="login" title="Log in" initial component={Login}/>
        <Scene key="drawer" component={DrawerList}>
          <Scene key="sessions" component={Sessions} title="Sessions"/>
          <Scene key="edit" component={Edit} title="Edit session"/>
        </Scene>
        <Drawer key="drawer" component={DrawerList}>
          <Scene key="sessions" component={Sessions} title="Sessions"/>
          <Scene key="edit" component={Edit} title="Edit session"/>
        </Drawer>*/}
      </Scene>
    </Router>
  );
};

export default NavigationRouter;
