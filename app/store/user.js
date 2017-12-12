import { fetchCurrentUser, fetchUpdatePhotographer } from '../api';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const FETCHING_CURRENT_USER = 'FETCHING_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
import {auth} from '../containers/NavigationRouter';

const initialState = {
  currentUser: {},
  fetchingCurrentUser: false
};

export const getCurrentUser = () => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      if(state.user.fetchingCurrentUser) {
        return resolve();
      }

      dispatch({
        type: FETCHING_CURRENT_USER,
        data: true
      });

      return fetchCurrentUser().then(res => {
        if(!res.data) {
          auth.logout();
        }

        dispatch({
          type: GET_CURRENT_USER,
          data: res.data.current_user
        });

        dispatch({
          type: FETCHING_CURRENT_USER,
          data: false
        });
        resolve(res);
      }).catch((err) => {reject(err)})
    })
  };
}

export const updatePhotographer = (formData) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      fetchUpdatePhotographer(formData).then((data) => {
        resolve(data);
      }).catch(err => reject(err));
    })
  }
}

const ACTION_HANDLERS = {
  [GET_CURRENT_USER]: (state, action) => {
    return ({
      ...state,
      currentUser: action.data
    })
  },
  [FETCHING_CURRENT_USER]: (state, action) => {
    return ({
      ...state,
      fetchingCurrentUser: action.data
    })
  },
  [UPDATE_CURRENT_USER]: (state, action) => {
    return ({
      ...state,
      currentUser: action.data
    })
  }
}

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
