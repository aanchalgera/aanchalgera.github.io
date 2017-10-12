import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import TitleBar from 'components/Menu/TitleBar';
import { customTheme } from './styles/customTheme';
import { getBlogUrl, getUserDetails } from './lib/service';
import Publicar from './Publish';
import Difundir from './Difundir';

type Props = {
  match: { params: Object },
  location: { search: string, pathname: string },
  history: Object,
  base: Object
};

export default class Layout extends React.Component {
  props: Props;
  state = {
    blogUrl: null,
    showDifundir: false,
    showPostStatusMsg: false,
    publishedDate: ''
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

    try {
      const blogUrl = await getBlogUrl(blogName, this.props.base);
      const userData = await getUserDetails(blogUrl);
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

  handleDifundir = (status: string, publishedDate: string) => {
    let showDifundir = false;
    let showPostStatusMsg = false;

    if (status === 'publish') {
      showPostStatusMsg = true;
      if(this.state.userRole !== 'ROLE_BRANDED_COLLABORATOR') {
        showDifundir = true;
      }
    }
    this.setState({
      showDifundir: showDifundir,
      showPostStatusMsg: showPostStatusMsg,
      publishedDate: publishedDate
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
        showDifundir={this.state.showDifundir}
        history={this.props.history}
        blogName={this.state.blogName}
        showPostStatusMsg={this.state.showPostStatusMsg}
        publishedDate={this.state.publishedDate}
      />
    );
  };

  render() {
    const { base } = this.props;
    if (this.state.blogUrl == null) {
      return <div> Loading... </div>;
    }
    const { showDifundir, ...rest } = this.state;
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <view>
          {this.getTitleBar()}
          <Switch>
            <Route
              path="/publicar/:postname"
              render={props =>
                <Publicar
                  {...props}
                  {...rest}
                  base={base}
                  handleDifundir={this.handleDifundir}
                />}
            />
            <Route
              path="/difundir/:postname"
              render={props =>
                <Difundir
                  {...props}
                  {...rest}
                  base={base}
                  handleDifundir={this.handleDifundir}
                />}
            />
          </Switch>
        </view>
      </MuiThemeProvider>
    );
  }
}
