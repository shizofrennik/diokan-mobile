import { combineReducers } from 'redux';
import user from './user';
import sessions from './sessions';

const rootReducer = combineReducers({
  user,
  sessions
});

export default rootReducer;
