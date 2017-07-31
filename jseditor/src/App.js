import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './config/routes';
import { Provider } from 'react-redux';
import store from './stores/ConfigureStore';
import CSS from './utils/css';

CSS.prepare();


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
