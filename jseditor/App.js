import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './app/config/routes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import { Provider } from 'react-redux';
import configs from './app/reducers/Configs';

let store =  applyMiddleware(thunk, createLogger())(createStore)(configs);

render(
  <Provider store={store}>
    <Router history={browserHistory}>{Routes}</Router>
  </Provider>,
  document.getElementById('app')
);
