// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './TopBar';
import Config from './Config';
import ConfigList from './ConfigList';
import NotFoundPage from 'components/NotFoundPage';
import Home from 'components/Home';
import NotAuthorized from 'components/NotAuthorized';

type Props = {
  location: { search: string, pathname: string }
};
const ConfigContainer = (props: Props) => {
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
        <Route path="/configs" render={props => <ConfigList {...props} />} />
        <Route path="/config/new" render={props => <Config {...props} />} />
        <Route
          path="/config/:configId"
          render={props => <Config {...props} />}
        />
        <Route path="/notAuthorized" component={NotAuthorized} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default ConfigContainer;
