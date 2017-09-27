import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/index';

export default function configureStore(initialState) {
  return compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
}
