import React, {PropTypes} from 'react';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Publicar from '../containers/Publish';
import Config from '../components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';
import TitleBar from '../components/TitleBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { white, grey900, grey500, grey300 } from 'material-ui/styles/colors';
import { Switch, Route } from 'react-router-dom';

injectTapEventPlugin();

const customTheme = getMuiTheme({
  appBar: {
    color: grey900,
    textColor: white
  },
  tabs: {
    backgroundColor: grey900,
    textColor: white
  },
  flatButton: {
    textColor: white
  },
  svgIcon: {
    color: white
  },
  raisedButton: {
    disabledColor: grey300,
    disabledTextColor: grey500,
  }
});

var base = Rebase.createClass(
  {
    'apiKey': configParams.apiKey,
    'databaseURL': configParams.firebaseUrl
  }
);

class Main extends React.Component{
  render(){
    const { match: { url }, location: { pathname } } = this.props;
    Rollbar.info('User Navigation Info', {path: pathname});
    if (pathname.indexOf('publicar') > -1) {
      return (
        <MuiThemeProvider muiTheme={customTheme}>
          <view>
            <TitleBar />
            <Route path={`${url}publicar/:postname`} render={(props) => (
              <Publicar {...props} base={base} />
            )} />
          </view>
        </MuiThemeProvider>
      );
    }

    return (
      <div className="main-container">
        <TopBar />
        <div className="col-sm-12 main">
          <div className="container-fluid">
            <div className="row">
              <Switch>
                <Route exact path={`${url}`} component={Home}/>
                <Route path={`${url}configs`} render={(props) => (
                  <ConfigList {...props} base={base} />
                )} />
                <Route path={`${url}config/new`} render={(props) => (
                  <Config {...props} base={base} />
                )} />
                <Route path={`${url}config/:configId`} render={(props) => (
                  <Config {...props} base={base} />
                )} />
                <Route path={`${url}edit/post/:postname`} render={(props) => (
                  <Editor {...props} base={base} />
                )}/>
                <Route path={`${url}post/new`} render={(props) => (
                  <Editor {...props} base={base} />
                )}/>
                <Route path={`${url}publish/:postname`} render={(props) => (
                  <Publish {...props} base={base} />
                )} />
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
