import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TitleBar from '../components/Menu/TitleBar';
import { customTheme } from './styles/customTheme';
import { getBlogUrl, getUserDetails } from './lib/service';

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

  init = async () => {
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    const userId = query.get('userid');

    try {
      const blogUrl = await getBlogUrl(blogName, this.props.base);
      const userData = await getUserDetails(blogUrl, userId);
      this.setState({
        blogUrl: blogUrl,
        postname: postname,
        userRole: userData['roles'][0],
        blogName: blogName
      });
    } catch (error) {
      console.log(error.message);
      if (error.message === 'NOT_LOGGED_IN') {
        history.push('/invalidUser');
      } else {
        history.push('/invalidBlog');
      }
    }
  };

  handleDifundir = (status: string) => {
    let showDifundir = false;
    if (
      status === 'publish' &&
      this.state.userRole !== 'ROLE_BRANDED_COLLABORATOR'
    ) {
      showDifundir = true;
    }
    this.setState({ showDifundir });
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
        blogName={this.state.blogName}
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
