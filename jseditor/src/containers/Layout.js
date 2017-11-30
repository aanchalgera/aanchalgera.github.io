import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import TitleBar from 'components/Menu/TitleBar';
import { customTheme } from './styles/customTheme';
import { getBlogUrl, getUserDetails, saveInitialPost } from './lib/service';
import { isFuture } from './lib/momentHelper';
import Publicar from './Publish';
import Difundir from './Difundir';
import Escribir from './Escribir';
import Editor from './Editor';
import helpers from 'utils/generatehash';

type Props = {
  match: { params: Object },
  location: { search: string, pathname: string },
  history: Object
};

export default class Layout extends React.PureComponent<Props> {
  state = {
    blogUrl: null,
    showDifundir: false,
    showPostStatusMsg: false,
    statusMsg: ''
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { location: { search }, history } = this.props;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    const pathName = this.props.location.pathname;
    try {
      const blogUrl = await getBlogUrl(blogName);
      const userData = await getUserDetails(blogUrl);
      this.setState({
        blogUrl: blogUrl,
        userRole: userData['roles'][0],
        blogName: blogName
      });

      if ('/post/new' === pathName) {
        const hashId = helpers.generatePushID();
        const postType = query.get('type');
        const editUrl = postType === 'normal' ? '/escribir/' : '/edit/post/';
        const postEditUrl = editUrl + hashId + '?blog=' + blogName;
        history.push(postEditUrl);
        const initialData = {
          id: hashId,
          user_id: userData.id,
          postType: postType,
          blogName: blogName,
          status: 'draft',
          title: '',
          sections: []
        };
        saveInitialPost(initialData);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === 'NOT_LOGGED_IN') {
        history.push('/invalidUser');
      } else {
        history.push('/invalidBlog');
      }
    }
  };

  handleStatus = (statusMsg: string) => {
    this.setState({
      showPostStatusMsg: true,
      statusMsg: statusMsg
    });
  };

  hideStatus = () => {
    this.setState({
      showPostStatusMsg: false
    });
  };

  handleDifundir = (status: string, publishedDate: string) => {
    let showDifundir = false;
    let showPostStatusMsg = false;

    if (status === 'publish') {
      showPostStatusMsg = true;
      if (this.state.userRole !== 'ROLE_BRANDED_COLLABORATOR') {
        showDifundir = true;
      }
    }

    let statusMsg = isFuture(publishedDate) ? 'Programado' : 'Publicado';

    this.setState({
      showDifundir: showDifundir,
      showPostStatusMsg: showPostStatusMsg,
      statusMsg: statusMsg
    });
  };

  getTitleBar = () => {
    return (
      <TitleBar
        {...this.props}
        blogUrl={this.state.blogUrl}
        showDifundir={this.state.showDifundir}
        blogName={this.state.blogName}
        showPostStatusMsg={this.state.showPostStatusMsg}
        statusMsg={this.state.statusMsg}
        saveData={this.editor && this.editor.saveData}
        toggleOrderMode={this.editor && this.editor.toggleOrderMode}
        hideStatus={this.hideStatus}
      />
    );
  };

  render() {
    if (this.state.blogUrl == null) {
      return <div> Loading... </div>;
    }
    const { showDifundir, statusMsg, showPostStatusMsg, ...rest } = this.state;
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <div>
          {this.getTitleBar()}
          <Switch>
            <Route
              path="/publicar/:postname"
              render={props => (
                <Publicar
                  {...props}
                  {...rest}
                  handleDifundir={this.handleDifundir}
                />
              )}
            />
            <Route
              path="/difundir/:postname"
              render={props => (
                <Difundir
                  {...props}
                  {...rest}
                  handleDifundir={this.handleDifundir}
                />
              )}
            />
            <Route
              path="/escribir/:postname"
              render={props => (
                <Escribir
                  onRef={ref => {
                    this.editor = ref;
                  }}
                  {...props}
                  {...rest}
                  handleStatus={this.handleStatus}
                />
              )}
            />
            <Route
              path={'/edit/post/:postname'}
              render={props => (
                <div
                  className="container-fluid"
                  style={{ paddingTop: '112px' }}
                >
                  <Editor
                    onRef={ref => {
                      this.editor = ref;
                    }}
                    {...props}
                    {...rest}
                    handleStatus={this.handleStatus}
                  />
                </div>
              )}
            />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}
