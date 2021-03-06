import {isTokenExpired} from './jwtHelper';
import Auth0 from 'react-native-auth0';
import * as api from '../api';
import {Actions} from 'react-native-router-flux';
export const auth0DatabaseConnection = "Username-Password-Authentication";
const auth0api = "https://dmkryhtin.auth0.com/api/v2/";
import * as common from '../utils/common';

export function getAuthHeaders(token) {
  return global.storage.load({
    key: "authTokenDiokan"
  }).then(token => {
    return new Headers({
      "Accept": "application/json",
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    });
  });
}

export default class AuthService {
  constructor(clientId, domain) {
    this.clientId = clientId;
    this.domain = domain;
    this._doAuthentication = this._doAuthentication.bind(this);
    this.auth0 = new Auth0({
      domain: domain,
      clientId: clientId,
      scope: "openid email profile offline_access",
      responseType: 'id_token token'
    });
  }

  _doAuthentication(email, password, remember = false) {
    return new Promise((resolve, reject) => {
      var authData = {
        grant_type: "password",
        username: email,
        password: password,
        audience: "https://dmkryhtin.auth0.com/api/v2/",
        scope: "openid email profile offline_access",
        client_id: this.clientId
      }

      api.fetchSignIn(this.domain, authData).then((resp) => {
        // setAuthorizationHeader(resp.id_token)
        if(!resp.error) this.setToken(resp.id_token);
        if(remember && resp.refresh_token){
          this.setRefreshToken(resp.refresh_token);
        }
        this.auth0.auth.userInfo({token: resp.access_token}).then((profile) => {
          if(profile['https://diokan.info/role'] === 'photographer') {
            this.setProfile(profile).then(() => {
              resolve(profile);
            });
          } else {
            reject(profile);
          }
        }).catch(console.log);
      }).catch((error) => {
        reject(error)
      });
    });
  }

  _doRefreshAuthentication(token) {
    return new Promise((resolve, reject) => {
      var authData = {
        grant_type: "refresh_token",
        refresh_token: token,
        audience: "https://dmkryhtin.auth0.com/api/v2/",
        scope: "openid email profile offline_access",
        client_id: this.clientId
      }

      api.fetchSignIn(this.domain, authData).then((resp) => {
        if(!resp.error) this.setToken(resp.id_token);
      }).catch((error) => {
        reject(error)
      });
    });
  }

  renew(){
    this.getRefreshToken().then(token => {
      if(token) {
        this._doRefreshAuthentication(token);
      }
    }).catch(console.log);
  }

  loggedIn() {
    return this.getToken().then(token => {
      return !!token && !isTokenExpired(token);
    });
  }

  logout() {
    global.storage.remove({key: 'authTokenDiokan'});
    global.storage.remove({key: 'profileDiokan'});
    global.storage.remove({key: 'authRefreshTokenDiokan'});
    Actions.replace('login');
  }

  setProfile(profile) {
    return global.storage.save({
      key: "profileDiokan",
      data: JSON.stringify(profile)
    });
  }

  setToken(idToken) {
    return global.storage.save({
      key: "authTokenDiokan",
      data: idToken
    });
  }

  setRefreshToken(refreshToken) {
    return global.storage.save({
      key: "authRefreshTokenDiokan",
      data: refreshToken
    });
  }

  getToken() {
    return global.storage.load({
      key: "authTokenDiokan"
    }).then(token => token, err => false);
  }

  getRefreshToken() {
    return global.storage.load({
      key: "authRefreshTokenDiokan"
    }).then((token) => Promise.resolve(token)).catch(() => Promise.resolve(null));
  }

  getProfile() {
    return global.storage.load({
      key: "profileDiokan"
    });
  }
}