//@flow
import * as React from 'react';
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

const app = firebase.initializeApp({
  apiKey: configParams.apiKey,
  databaseURL: configParams.firebaseUrl
});
const base = Rebase.createClass(app.database());

type Props = {
  location: { search: string, pathname: string }
};

const Main = (props: Props) => {
  const { location: { pathname } } = props;
  if (
    pathname.indexOf('/publicar/') > -1 ||
    pathname.indexOf('/difundir/') > -1 ||
    pathname.indexOf('/edit/') > -1 ||
    pathname.indexOf('/post/new') > -1
  ) {
    return <Layout {...props} base={base} />;
  }

  return (
    <div className="grid-wrapper grid-l">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
      />
      <TopBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/configs"
          render={props => <ConfigList {...props} base={base} />}
        />
        <Route
          path="/config/new"
          render={props => <Config {...props} base={base} />}
        />
        <Route
          path="/config/:configId"
          render={props => <Config {...props} base={base} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default Main;
