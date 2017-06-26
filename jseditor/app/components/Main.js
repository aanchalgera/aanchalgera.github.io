import React, {PropTypes} from 'react';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Config from '../components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';

import { Switch, Route } from 'react-router-dom';

var base = Rebase.createClass(
  {
    'apiKey': configParams.apiKey,
    'databaseURL': configParams.firebaseUrl
  }
);

class Main extends React.Component{
  render(){
    const { match: { url } } = this.props;
    Rollbar.info('User Navigation Info', {path: this.props.pathname});
    return (
      <div className="main-container">
        <TopBar />
        <div className="col-sm-12 main">
          <div className="container-fluid">
            <div className="row">
              <Switch>
                <Route exact path={`${url}`} component={Home}/>
                <Route exact path={`${url}configs`} render={(props) => (
                  <ConfigList {...props} base={base} />
                )} />
                <Route exact path={`${url}config/new`} render={(props) => (
                  <Config {...props} base={base} />
                )} />
                <Route exact path={`${url}config/:configId`} render={(props) => (
                  <Config {...props} base={base} />
                )} />
                <Route exact path={`${url}edit/post/:postname`} render={(props) => (
                  <Editor {...props} base={base} />
                )}/>
                <Route exact path={`${url}post/new`} render={(props) => (
                  <Editor {...props} base={base} />
                )}/>
                <Route exact path={`${url}publish/:postname`} render={(props) => (
                  <Publish {...props} base={base} />
                )} />
                <Route path="*" component={NotFoundPage} />
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
