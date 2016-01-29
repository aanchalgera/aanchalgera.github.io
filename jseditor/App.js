import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
import Routes from './app/config/routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configs from './app/reducers/Configs';

const store = createStore(configs);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{Routes}</Router>
  </Provider>,
  document.getElementById('app')
);
