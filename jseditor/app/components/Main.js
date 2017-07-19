import React, {PropTypes} from 'react';
import TopBar from './Menu/TopBar';
import Rebase from 're-base';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Publicar from '../containers/Publish';
import Difundir from '../containers/Difundir';
import Config from '../components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';
import TitleBar from '../components/Menu/TitleBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { white, grey900, grey500, grey300, indigo500, pink500 } from 'material-ui/styles/colors';
import { Switch, Route } from 'react-router-dom';

injectTapEventPlugin();

const palette = {
  primary1Color: grey900,
  primaryButtonColor: pink500,
  textColor: white,
  disabledColor: grey300,
  disabledTextColor: grey500,
  checkedColor: indigo500,
};

const customTheme = getMuiTheme({
  appBar: {
    color: palette.primary1Color,
    textColor: palette.textColor
  },
  tabs: {
    backgroundColor: palette.primary1Color,
    textColor: palette.textColor
  },
  flatButton: {
    textColor: palette.textColor
  },
  svgIcon: {
    textColor: palette.textColor
  },
  raisedButton: {
    disabledColor: palette.disabledColor,
    disabledTextColor: palette.disabledTextColor,
    primaryColor: palette.primaryButtonColor,
    primaryTextColor: palette.textColor,
  },
  checkbox: {
    checkedColor: palette.checkedColor
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
    const { match: { url }, location: { pathname, search } } = this.props;
    Rollbar.info('User Navigation Info', {path: pathname});
    if (pathname.indexOf('/publicar/') > -1 || pathname.indexOf('/difundir/') > -1) {
      const matches = pathname.match('\/(.+)\/(.+)');
      return (
        <MuiThemeProvider muiTheme={customTheme}>
          <view>
            <TitleBar pathName={matches[2]} activeTab={matches[1]} queryPath={search} />
            <Route path={`${url}publicar/:postname`} render={(props) => (
              <Publicar {...props} base={base} />
            )} />
            <Route path={`${url}difundir/:postname`} render={(props) => (
              <Difundir {...props} base={base} />
            )} />
          </view>
        </MuiThemeProvider>
      );
    }

    return (
      <div className="main-container">
        <link rel="stylesheet" href="/css/simplemde.min.css"/>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/custom.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"/>
        <script src="//widget.cloudinary.com/global/all.js" type="text/javascript"></script>
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
