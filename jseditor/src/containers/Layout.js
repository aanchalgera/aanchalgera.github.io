import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TitleBar from '../components/Menu/TitleBar';
import { customTheme } from '../components/styles/customTheme';
import { getConfig } from './lib/service';

type Props = {
  match: { params: Object },
  location: { search: string, pathname: string },
  history: Object,
  component: React$Component<any>,
  base: Object
};

export default class Layout extends React.Component {
  props: Props;
  state = {
    blogUrl: null,
    showDifundir: false
  };

  componentWillMount() {
    this.init();
  }

  validateUserId(userId: string, history: Object) {
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
    this.blogName = query.get('blog');
    const userId = query.get('userid');
    this.validateUserId(userId, history);

    getConfig(this.blogName, this.props.base).then(data => {
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

  handleDifundir = (status: string) => {
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
        history={this.props.history}
        blogName={this.blogName}
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
