import React from 'react';
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

  validateUserId(userId, history) {
    let regEx = /\D/;
    if (regEx.test(userId)) {
      history.push('/invalidUser');
    }
  }

  init = () => {
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    const userId = query.get('userid');
    this.validateUserId(userId, history);

    getConfig(blogName, this.props.base).then(data => {
      if (data[0] != null) {
        this.setState({
          blogUrl: data[0].site_url,
          userId: userId,
          postname: postname
        });
      } else {
        history.replace('/invalidBlog');
      }
    });
  };

  getTitleBar = () => {
    const pathName = this.props.location.pathname;
    const search = this.props.location.search;
    const matches = pathName.match('/(.+)/(.+)');
    return (
      <TitleBar
        postName={matches[2]}
        blogUrl={this.state.blogUrl}
        activeTab={matches[1]}
        queryPath={search}
      />
    );
  };

  render() {
    const { component: Component, base } = this.props;
    if (this.state.blogUrl == null) {
      return <div> Loading... </div>;
    }
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <view>
          {this.getTitleBar()}
          <Component {...this.state} base={base} />}
        </view>
      </MuiThemeProvider>
    );
  }
}
