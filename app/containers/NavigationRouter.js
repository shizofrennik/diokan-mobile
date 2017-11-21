import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Tabs, Lightbox, Stack, Drawer } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import Login from '../components/Auth/Login';
import Edit from '../components/Sessions/Edit';
import Show from '../components/Sessions/Show';
import ShowControls from '../components/Nav/ShowControls';
import Create from '../components/Sessions/Create';
import Sessions from '../components/Sessions/Sessions';
import DrawerList from '../components/Nav/DrawerList';
import InitialScreen from '../components/Nav/InitialScreen';
import { Actions } from 'react-native-router-flux';
import AuthService from '../utils/AuthService';
import styles from '../assets/styles/app';

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
  return (
    <Router auth={auth}>
      <Scene key="root" hideNavBar navigationBarStyle={styles.header} navBarButtonColor="white" titleStyle={styles.headerTitle}>
        <Scene key="initial" initial component={InitialScreen} onEnter={initialRedirect}/>
        <Scene key="login" title="Log in" component={Login} onEnter={isLoggedIn}/>
        <Scene key="app" onEnter={requireAuth}>
          <Scene key="sessions" initial component={Sessions} title="Sessions" onEnter={requireAuth}/>
          <Scene key="edit" component={Edit} title="Edit Session" onEnter={requireAuth}/>
          <Scene key="createSession" component={Create} title="Add Session" onEnter={requireAuth}/>
          <Scene key="show" renderRightButton={() => <ShowControls />} component={Show} onEnter={requireAuth}/>
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
