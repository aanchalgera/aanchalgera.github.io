import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './config/routes';
import { Provider } from 'react-redux';
import store from './stores/ConfigureStore';
import CSS from './utils/css';
import { init as firebaseInit } from 'lib/firebase';

CSS.prepare();

class App extends Component {
  constructor() {
    super();
    firebaseInit();
  }

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
