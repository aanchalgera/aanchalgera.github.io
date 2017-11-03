import React from 'react';
import PropTypes from 'prop-types';
import Rebase from 're-base';
import firebase from 'firebase';
import { Switch, Route } from 'react-router-dom';

import TopBar from './Menu/TopBar';
import Layout from 'containers/Layout';
import Config from 'components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';
import configParams from '../config/configs.js';

var app = firebase.initializeApp({
  apiKey: configParams.apiKey,
  databaseURL: configParams.firebaseUrl
});
var base = Rebase.createClass(app.database());

class Main extends React.Component {
  render() {
    const { match: { url }, location: { pathname } } = this.props;
    if (
      pathname.indexOf('/publicar/') > -1 ||
      pathname.indexOf('/difundir/') > -1 ||
      pathname.indexOf('/edit/') > -1
    ) {
      return <Layout {...this.props} base={base} />;
    }

    return (
      <div className="main-container">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/custom.css" />
        <TopBar />
        <div className="col-sm-12 main">
          <div className="container-fluid">
            <div className="row1">
              <Switch>
                <Route exact path={`${url}`} component={Home} />
                <Route
                  path={`${url}configs`}
                  render={props => <ConfigList {...props} base={base} />}
                />
                <Route
                  path={`${url}config/new`}
                  render={props => <Config {...props} base={base} />}
                />
                <Route
                  path={`${url}config/:configId`}
                  render={props => <Config {...props} base={base} />}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
