import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import Routes from './app/config/routes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configs from './app/reducers/Configs';

let store =  applyMiddleware(thunk)(createStore)(configs);

render(
  <Provider store={store}>
    <Router history={hashHistory}>{Routes}</Router>
  </Provider>,
  document.getElementById('app')
);
