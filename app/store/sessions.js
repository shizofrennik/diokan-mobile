import {
  fetchSessions,
  fetchCreateSession,
  fetchUpdateSession,
  fetchUpdateStatus,
  fetchSession,
  fetchDestroyPhotoSession,
  fetchDestroyPhotoFromSession,
  fetchValidateEmails,
  fetchDeleteUserFromPhotoSession
} from '../api';
import moment from 'moment';
export const GET_SESSION = 'GET_SESSION';
export const GET_SESSIONS = 'GET_SESSIONS';
export const SET_SELECTED_SESSION = 'SET_SELECTED_SESSION';
export const REMOVE_SELECTED_SESSION = 'REMOVE_SELECTED_SESSION';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCHING_CREATE_SESSION = 'FETCHING_CREATE_SESSION';
export const FETCHING_UPDATE_SESSION = 'FETCHING_UPDATE_SESSION';
export const TOGGLE_SHOW_CONTROLS = 'TOGGLE_SHOW_CONTROLS';
export const SET_SHOW_CONTROLS = 'SET_SHOW_CONTROLS';
export const SET_SESSIONS_PAGINATION = 'SET_SESSIONS_PAGINATION';
export const FETCHING_SESSIONS = 'FETCHING_SESSIONS';
export const CREATE_SESSION = 'CREATE_SESSION';
export const CLEAR_PAGINATION = 'CLEAR_PAGINATION';
const paginationDefault = {offset: 0, count: 50};

const initialState = {
  sessions: [],
  selectedSession: {},
  fetchingSessions: false,
  fetchingCreateSession: false,
  fetchingUpdateSession: false,
  pagination: paginationDefault,
  total_count: 0,
  filters: {order: 0, search_string: ''},
  user: {},
  showControls: false
};

export const sortSessionByDate = (sessions) => {
  let today = moment().startOf('day'),
      yesterday = moment(today).subtract(1, 'day'),
      week = moment(yesterday).subtract(1, 'week'),
      month = moment(week).subtract(1, 'month');
  
  return [
    {title: "Today", data: sessions.filter(session => moment(session.date) >= today)},
    {title: "Yesterday", data: sessions.filter(session => ((moment(session.date) >= yesterday) && (moment(session.date) < today)))},
    {title: "Last Week", data: sessions.filter(session => ((moment(session.date) >= week) && (moment(session.date) < yesterday)))},
    {title: "Last Month", data: sessions.filter(session => ((moment(session.date) >= month) && (moment(session.date) < week)))},
    {title: "Older Sessions", data: sessions.filter(session => moment(session.date) < month)}
  ]
}

export const createSession = (formData) => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      if(state.sessions.fetchingCreateSession) {
        return resolve();
      }
      
      dispatch({
        type: FETCHING_CREATE_SESSION,
        data: true
      });
      
      return fetchCreateSession(formData).then(res => {
        dispatch({
          type: CREATE_SESSION,
          data: res.data
        });

        dispatch({
          type: FETCHING_CREATE_SESSION,
          data: false
        });
        resolve(res.data);
      }).catch((err) => reject())
    });
  }
}

export const updateSession = (formData) => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      if(state.sessions.fetchingUpdateSession) {
        return resolve();
      }

      dispatch({
        type: FETCHING_UPDATE_SESSION,
        data: true
      });

      return fetchUpdateSession(formData).then(res => {
        return fetchSession(res.data.update_photo_session.id).then(res => {
          let session = res.data.photographer_photo_session;
          let session_photos = session.session_photos.map(photo => ({
            id: photo.id,
            name: photo.name,
            assigned_automatically: photo.assigned_automatically,
            src: photo.file_url,
            srcset: [`${photo.largesize_url} 1920w`, `${photo.mediumsize_url} 1280w`],
            thumbnail: photo.thumbnail_url,
            small_size: photo.smallsize_url,
            medium_size: photo.mediumsize_url,
            large_size: photo.largesize_url
          }));

          dispatch({
            type: GET_SESSION,
            data: {photographer_photo_session: Object.assign({}, session, {session_photos})}
          });
          
          getSessions()(dispatch, getState);

          dispatch({
            type: FETCHING_UPDATE_SESSION,
            data: false
          });

          resolve(res);
        });
      }).catch((err) => reject(err))
    });
  }
}

export const validateEmail = (emails) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      fetchValidateEmails(emails).then(data => {
        let emailsArr = data.data.check_emails_for_session.data;
        let invalidEmails = emailsArr.filter(email => !email.valid);
        resolve(invalidEmails.length === 0);
      }).catch(err => reject(false));
    })
  }
}

export const setPagination = (pagination) => {
  return (dispatch, getState) => {
    let filters = getState().sessions.filters;
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_SESSIONS_PAGINATION,
        data: pagination
      });

      resolve(getSessions(filters, pagination)(dispatch, getState));
    })
  }
}

export const updateStatus = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetchUpdateStatus(id).then(() => {
        resolve();
      }).catch((err) => reject())
    });
  }
}

export const getSession = (id) => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      return fetchSession(id).then(res => {
        let session = res.data.photographer_photo_session;
        let session_photos = session.session_photos.map(photo => ({
          id: photo.id,
          name: photo.name,
          assigned_automatically: photo.assigned_automatically,
          src: photo.file_url,
          srcset: [`${photo.largesize_url} 1920w`, `${photo.mediumsize_url} 1280w`],
          thumbnail: photo.thumbnail_url,
          small_size: photo.smallsize_url,
          medium_size: photo.mediumsize_url,
          large_size: photo.largesize_url}));

        dispatch({
          type: GET_SESSION,
          data: {photographer_photo_session: Object.assign({}, session, {session_photos})}
        });

        resolve(res);
      }).catch((err) => reject(err))
    })
  };
}

export const getSessions = (filters = {}, pagination = paginationDefault) => {
  return (dispatch, getState) => {
    let state = getState();
    let filters = state.sessions.filters;
    return new Promise((resolve, reject) => {
      if(state.sessions.fetchingSessions) {
        return resolve();
      }

      dispatch({
        type: FETCHING_SESSIONS,
        data: true
      });

      return fetchSessions(filters, pagination).then(res => {
        dispatch({
          type: GET_SESSIONS,
          data: res.data
        });

        dispatch({
          type: FETCHING_SESSIONS,
          data: false
        });
        resolve(res);
      }).catch((err) => reject(err))
    })
  };
}

export const destroySession = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetchDestroyPhotoSession(id).then(res => {
        resolve(res);
      }).catch((err) => reject())
    })
  };
}

export const destroySessionPhoto = (id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetchDestroyPhotoFromSession(id).then(res => {
        resolve(res);
      }).catch((err) => reject())
    })
  };
}

export const setSelectedSession = (session) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SHOW_CONTROLS,
      data: false
    });
    dispatch({
      type: SET_SELECTED_SESSION,
      data: session
    });
  };
}

export const setShowControls = (bool) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SHOW_CONTROLS,
      data: bool
    })
  };
}

export const toggleShowControls = () => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_SHOW_CONTROLS
    });
  };
}

export const removeSelectedSession = () => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_SELECTED_SESSION
    });
  };
}

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      return fetchDeleteUserFromPhotoSession(state.sessions.selectedSession.id, id).then(res => {
        resolve(res);
      }).catch((err) => reject())
    })
  };
}

export const deleteSelectedUser = (session_id, user_id) => {
  return (dispatch, getState) => {
    let state = getState();
    return new Promise((resolve, reject) => {
      return fetchDeleteUserFromPhotoSession(session_id, user_id).then(res => {
        resolve(res);
      }).catch((err) => reject())
    })
  };
}

export const setFilters = (filters) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_FILTERS,
        data: filters
      });
      dispatch({
        type: CLEAR_PAGINATION
      })
      resolve();
    })
  }
}

const ACTION_HANDLERS = {
  [GET_SESSIONS]: (state, action) => {
    return ({
      ...state,
      sessions: action.data.photographer_photo_sessions.results,
      total_count: action.data.photographer_photo_sessions.total_count,
    })
  },
  [GET_SESSION]: (state, action) => {
    return ({
      ...state,
      selectedSession: action.data.photographer_photo_session
    })
  },
  [SET_SELECTED_SESSION]: (state, action) => {
    return ({
      ...state,
      selectedSession: action.data
    })
  },
  [REMOVE_SELECTED_SESSION]: (state, action) => {
    return ({
      ...state,
      selectedSession: {}
    })
  },
  [SET_FILTERS]: (state, action) => {
    let filters = {...state.filters, ...action.data};
    return ({
      ...state,
      filters
    })
  },
  [SET_SESSIONS_PAGINATION]: (state, action) => {
    let pagination = {...state.pagination, ...action.data};
    return ({
      ...state,
      pagination
    })
  },
  [FETCHING_SESSIONS]: (state, action) => {
    return ({
      ...state,
      fetchingSessions: action.data
    })
  },
  [FETCHING_CREATE_SESSION]: (state, action) => {
    return ({
      ...state,
      fetchingCreateSession: action.data
    })
  },
  [FETCHING_UPDATE_SESSION]: (state, action) => {
    return ({
      ...state,
      fetchingUpdateSession: action.data
    })
  },
  [TOGGLE_SHOW_CONTROLS]: (state, action) => {
    return ({
      ...state,
      showControls: !state.showControls
    })
  }, 
  [SET_SHOW_CONTROLS]: (state, action) => {
    return ({
      ...state,
      showControls: action.data
    })
  },
  [CLEAR_PAGINATION]: (state, action) => {
    return ({
      ...state,
      pagination: paginationDefault
    })
  }
}

export default function sessionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}