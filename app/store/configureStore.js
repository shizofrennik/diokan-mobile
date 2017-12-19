import Reactotron from 'reactotron-react-native'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/index';

export default function configureStore(initialState) {
  return Reactotron.createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
  // return compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
}
