import React from 'react';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TitleBar from '../components/Menu/TitleBar';
import { customTheme } from '../components/styles/customTheme';
import { getConfig } from './lib/service';

export default class Layout extends React.Component {
  state = {
    blogUrl: null
  };

  componentWillMount() {
    this.init();
  }

  init = () => {
    const search = this.props.location.search;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    getConfig(blogName, this.props.base).then(data => {
      if (data[0] != null) {
        this.setState({
          blogName: this.blogName,
          blogUrl: data[0].site_url
        });
      } else {
        this.props.history.replace('/invalidBlog');
      }
    });
  };

  getTitleBar = () => {
    const pathName = this.props.location.pathname;
    const search = this.props.location.search;
    const matches = pathName.match('/(.+)/(.+)');
    return (
      <TitleBar
        pathName={matches[2]}
        blogUrl={this.state.blogUrl}
        activeTab={matches[1]}
        queryPath={search}
      />
    );
  };

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.blogUrl == null) {
      return <div> Loading... </div>;
    }
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <view>
          {this.getTitleBar()}
          <Route
            render={props =>
              <Component props blogUrl={this.state.blogUrl} {...rest} />}
          />
        </view>
      </MuiThemeProvider>
    );
  }
}
