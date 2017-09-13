import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TitleBar from '../components/Menu/TitleBar';
import { customTheme } from '../components/styles/customTheme';
import { getConfig, getUserDetails } from './lib/service';

export default class Layout extends React.Component {
  state = {
    blogUrl: null,
    showDifundir: false
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

  init = async () => {
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    const userId = query.get('userid');
    this.validateUserId(userId, history);

    const data = await getConfig(blogName, this.props.base);

    if (data[0] != null) {
      const blogUrl = data[0].site_url;
      const userDetails = await getUserDetails(blogUrl, userId);
      this.setState({
        blogUrl: blogUrl,
        userId: userId,
        postname: postname,
        userRole: userDetails['role']
      });
    } else {
      history.replace('/invalidBlog');
    }
  };

  handleDifundir = status => {
    this.setState({ showDifundir: status === 'publish' || false });
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
        showDifundir={this.state.showDifundir}
      />
    );
  };

  render() {
    const { component: Component, base } = this.props;
    if (this.state.blogUrl == null) {
      return <div> Loading... </div>;
    }
    const { showDifundir, ...rest } = this.state;
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <view>
          {this.getTitleBar()}
          <Component
            {...rest}
            base={base}
            handleDifundir={this.handleDifundir}
          />
        </view>
      </MuiThemeProvider>
    );
  }
}
