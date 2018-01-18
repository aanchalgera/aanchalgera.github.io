import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';

import TitleBar from 'components/Menu/TitleBar';
import { customTheme } from './styles/customTheme';
import { getBlogUrl, getUserDetails, saveInitialPost } from './lib/service';
import { isFuture } from './lib/momentHelper';
import helpers from 'utils/generatehash';
import DevTools from 'devTools';
import { init as initCheck, isValidUser } from 'lib/check';

type Props = {
  match: { params: Object },
  location: { search: string, pathname: string },
  history: Object
};

const loading = () => {
  return <div className="grid-wrapper">Loading...</div>;
};

const LoadablePublish = Loadable({
  loader: () => import('./Publish'),
  loading
});

const LoadableEscribir = Loadable({
  loader: () => import('./Escribir'),
  loading
});

const LoadableDifundir = Loadable({
  loader: () => import('./Difundir'),
  loading
});

const LoadableEditor = Loadable({
  loader: () => import('./Editor'),
  loading
});

export default class Layout extends React.PureComponent<Props> {
  state = {
    blogUrl: null,
    showDifundir: false,
    showPostStatusMsg: false,
    statusMsg: ''
  };

  componentDidMount() {
    this.init();
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  init = async () => {
    const { location: { search }, history } = this.props;
    const query = new URLSearchParams(search);
    const blogName = query.get('blog');
    const pathName = this.props.location.pathname;
    try {
      const blogUrl = await getBlogUrl(blogName);
      const userData = await getUserDetails(blogUrl);
      const userRole = userData['roles'][0];
      this.setState({
        blogUrl,
        userRole,
        blogName,
        currentUser: userData['id']
      });

      if ('/post/new' === pathName) {
        const postType = query.get('type');
        initCheck(postType, userRole);
        if (!isValidUser()) {
          throw new Error('NOT_AUTHORIZED');
        }

        const hashId = helpers.generatePushID();
        const editUrl = postType === 'normal' ? '/escribir/' : '/edit/post/';
        const postEditUrl = editUrl + hashId + '?blog=' + blogName;
        history.push(postEditUrl);
        const initialData = {
          id: hashId,
          user_id: userData.id,
          postType,
          blogName,
          status: 'draft',
          title: '',
          sections: []
        };
        saveInitialPost(initialData);
      }
    } catch (error) {
      switch (error.message) {
        case 'NOT_LOGGED_IN':
          history.push('/invalidUser');
          break;
        case 'NOT_AUTHORIZED':
          history.push('/notAuthorized');
          break;
        default:
          history.push('/invalidBlog');
      }
    }
  };

  handleStatus = (statusMsg: string) => {
    this._isMounted &&
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

    this._isMounted &&
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
                <LoadablePublish
                  {...props}
                  {...rest}
                  handleDifundir={this.handleDifundir}
                />
              )}
            />
            <Route
              path="/difundir/:postname"
              render={props => (
                <LoadableDifundir
                  {...props}
                  {...rest}
                  handleDifundir={this.handleDifundir}
                />
              )}
            />
            <Route
              path="/escribir/:postname"
              render={props => (
                <LoadableEscribir
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
                  <LoadableEditor
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
          <DevTools />
        </div>
      </MuiThemeProvider>
    );
  }
}
