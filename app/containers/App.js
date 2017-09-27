import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import CoreLayout from './CoreLayout';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <CoreLayout />
  </Provider>
);

export default App;
