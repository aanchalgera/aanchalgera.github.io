import React from 'react';
import PropTypes from 'prop-types';
import Rebase from 're-base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import TopBar from './Menu/TopBar';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Publicar from '../containers/Publish';
import Difundir from '../containers/Difundir';
import Config from '../components/Config/Config';
import ConfigList from './Config/ConfigList';
import NotFoundPage from '../components/NotFoundPage';
import Home from '../components/Home';
import TitleBar from '../components/Menu/TitleBar';
import configParams from '../config/configs.js';
import  { customTheme } from './styles/customTheme.js'

var base = Rebase.createClass(
  {
    'apiKey': configParams.apiKey,
    'databaseURL': configParams.firebaseUrl
  }
);

class Main extends React.Component{
  state = {
    blogUrl: null,
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    const search = this.props.location.search;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    base.fetch('config', {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'site_name',
        equalTo: blogName
      },
      then(data) {
        if (data[0] != null) {
          this.setState({blogUrl: data[0].site_url});
        }
      }
    });
  }

  getTitleBar = () => {
    if (this.state.blogUrl === null) {
      return null;
    }
    const pathName = this.props.location.pathname;
    const search = this.props.location.search;
    const matches = pathName.match('\/(.+)\/(.+)');
    return <TitleBar
      pathName={matches[2]}
      blogUrl={this.state.blogUrl}
      activeTab={matches[1]}
      queryPath={search}
    />;
  }

  render(){
    const { match: { url }, location: { pathname } } = this.props;
    if (pathname.indexOf('/publicar/') > -1 || pathname.indexOf('/difundir/') > -1) {
      return (
        <MuiThemeProvider muiTheme={customTheme}>
          <view>
            { this.getTitleBar()}
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
