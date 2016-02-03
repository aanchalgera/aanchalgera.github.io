import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './app/config/routes';
import { Provider } from 'react-redux';
import store from './app/stores/ConfigureStore';

render(
  <Provider store={store}>
    <Router history={browserHistory}>{Routes}</Router>
  </Provider>,
  document.getElementById('app')
);
