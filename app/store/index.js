import { combineReducers } from 'redux';
import user from './user';
import sessions from './sessions';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user,
  sessions,
  form: formReducer
});

export default rootReducer;
