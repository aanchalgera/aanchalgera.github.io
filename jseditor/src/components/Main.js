import React from 'react';
import PropTypes from 'prop-types';
import Rebase from 're-base';
import { Switch, Route } from 'react-router-dom';

import TopBar from './Menu/TopBar';
import Editor from '../components/Editor/Editor';
import Layout from '../containers/Layout';
import Publicar from '../containers/Publish';
import Difundir from '../containers/Difundir';
import Config from '../components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';
import configParams from '../config/configs.js';

var base = Rebase.createClass({
  apiKey: configParams.apiKey,
  databaseURL: configParams.firebaseUrl
});

class Main extends React.Component {
  render() {
    const { match: { url }, location: { pathname } } = this.props;
    if (
      pathname.indexOf('/publicar/') > -1 ||
      pathname.indexOf('/difundir/') > -1
    ) {
      return (
        <div>
          <Route
            path="/publicar/:postname"
            render={props =>
              <Layout {...props} component={Publicar} base={base} />}
          />
          <Route
            path="/difundir/:postname"
            render={props =>
              <Layout {...props} component={Difundir} base={base} />}
          />
        </div>
      );
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
            <div className="row">
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
                <Route
                  path={`${url}edit/post/:postname`}
                  render={props => <Editor {...props} base={base} />}
                />
                <Route
                  path={`${url}post/new`}
                  render={props => <Editor {...props} base={base} />}
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
