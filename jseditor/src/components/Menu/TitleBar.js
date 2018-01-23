import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Visibility from 'material-ui/svg-icons/action/visibility';
import Save from 'material-ui/svg-icons/content/save';
import Shuffle from 'material-ui/svg-icons/av/shuffle';
import Info from 'material-ui/svg-icons/action/info';
import Expire from './Expire';
import { openModal } from '../../actions/modal';

const styles = {
  title: {
    color: 'white',
    textTransform: 'capitalize'
  },
  tabs: {
    width: '500px'
  }
};

const ESCRIBIR = 'edit/post';

type Props = {
  match: { params: Object },
  location: { search: string, pathname: string },
  history: Object,
  showPostStatusMsg: boolean,
  statusMsg: string,
  blogUrl: string,
  showDifundir: boolean,
  blogName: string,
  postType: string,
  saveData: () => void,
  toggleOrderMode: () => void,
  hideStatus: () => void,
  openModal: (modalName: string) => void
};

class TitleBar extends React.Component<Props> {
  handleChange = (route: string) => {
    const queryPath = this.props.location.search;
    this.props.history.push(`/${route}/${this.postName}${queryPath}`);
  };

  openNews = () => {
    this.props.openModal('snackbarPopover');
  };

  getStatusElement(activeTab) {
    let statusMsgElement = null;

    if (this.props.showPostStatusMsg) {
      statusMsgElement = (
        <span className="caption-inverted">{this.props.statusMsg}</span>
      );
    }
    if (activeTab === ESCRIBIR || activeTab === 'escribir') {
      if (this.props.showPostStatusMsg) {
        statusMsgElement = (
          <Expire
            open
            autoHideDuration={2000}
            onRequestHide={this.props.hideStatus}
          >
            {statusMsgElement}
          </Expire>
        );
      } else {
        statusMsgElement = <span className="caption-inverted">Guardado</span>;
      }
    }
    return statusMsgElement;
  }

  render() {
    const { blogUrl, showDifundir, blogName, postType } = this.props;
    const pathName = this.props.location.pathname;
    const matches = pathName.match('/(.+)/(.+)');
    const activeTab = matches[1];
    this.postName = matches[2];
    const editTab = postType === 'normal' ? 'escribir' : 'edit/post';
    return (
      <Toolbar className="header">
        <div className="brand-logo">
          <ToolbarTitle text={blogName} style={styles.title} />
          {activeTab === 'escribir' && (
            <IconButton onClick={this.openNews}>
              <Info />
            </IconButton>
          )}
        </div>
        <div className="nav-btn">
          <ToolbarGroup>
            <Tabs
              value={activeTab}
              onChange={this.handleChange}
              style={styles.tabs}
            >
              <Tab label="ESCRIBIR" value={editTab} />
              <Tab label="PUBLICAR" value="publicar" />
              {showDifundir && <Tab label="DIFUNDIR" value="difundir" />}
            </Tabs>
          </ToolbarGroup>
        </div>
        <div className="nav-icon">
          <ToolbarGroup>
            {this.getStatusElement(activeTab)}
            {(activeTab === ESCRIBIR || activeTab === 'escribir') && (
              <IconButton tooltip="Guardar" onClick={this.props.saveData}>
                <Save />
              </IconButton>
            )}{' '}
            {activeTab === ESCRIBIR && (
              <IconButton onClick={this.props.toggleOrderMode}>
                <Shuffle />
              </IconButton>
            )}
            <IconButton
              target="_blank"
              tooltip={'Ver en ' + blogUrl}
              href={blogUrl + '/preview-longform/' + this.postName}
            >
              <Visibility />
            </IconButton>
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  }
}

const mapStateToProps = state => {
  return { postType: state.post.postType };
};

export default connect(mapStateToProps, { openModal })(TitleBar);
