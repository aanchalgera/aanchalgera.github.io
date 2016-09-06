import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Routes from './app/config/routes';
import { Provider } from 'react-redux';
import store from './app/stores/ConfigureStore';

if (process.env.NODE_ENV == 'development') {
  Rollbar.configure({enabled: false});

  // Disable content-editable warning in console (Known issue)
  // http://facebook.github.io/draft-js/docs/advanced-topics-issues-and-pitfalls.html#react-contenteditable-warning
  console.error = (function() {
    var error = console.error;
    return function(exception) {
      if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
        error.apply(console, arguments);
      }
    };
  })();
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>{Routes}</Router>
  </Provider>,
  document.getElementById('app')
);
