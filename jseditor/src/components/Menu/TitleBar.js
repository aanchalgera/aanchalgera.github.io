import React from 'react';
import { IconButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Visibility from 'material-ui/svg-icons/action/visibility';
import Save from 'material-ui/svg-icons/content/save';
import Shuffle from 'material-ui/svg-icons/av/shuffle';

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

export default class TitleBar extends React.Component {
  handleChange = route => {
    const { history, postName, queryPath } = this.props;
    history.push(`/${route}/${postName}${queryPath}`);
  };

  render() {
    let statusMsgElement = null;

    if (this.props.showPostStatusMsg) {
      statusMsgElement = (
        <span className="caption-inverted">{this.props.statusMsg}</span>
      );
    }

    const {
      postName,
      blogUrl,
      activeTab,
      showDifundir,
      showPublicar,
      blogName
    } = this.props;
    return (
      <Toolbar className="header">
        <div className="brand-logo">
          <ToolbarTitle text={blogName} style={styles.title} />
        </div>
        <div className="nav-btn">
          <ToolbarGroup>
            <Tabs
              value={activeTab}
              onChange={this.handleChange}
              style={styles.tabs}
            >
              <Tab label="ESCRIBIR" value="edit/post" />
              {showPublicar && <Tab label="PUBLICAR" value="publicar" />}
              {showDifundir && <Tab label="DIFUNDIR" value="difundir" />}
            </Tabs>
          </ToolbarGroup>
        </div>
        <div className="nav-icon">
          <ToolbarGroup>
            {statusMsgElement}
            <ul className="nav-list">
              {activeTab === ESCRIBIR && (
                <li className="nav-list-item">
                  <IconButton onClick={this.props.updateOnBackend}>
                    <Save />
                  </IconButton>
                </li>
              )}{' '}
              {activeTab === ESCRIBIR && (
                <li className="nav-list-item">
                  <IconButton onClick={this.props.toggleOrderMode}>
                    <Shuffle />
                  </IconButton>
                </li>
              )}
              <li className="nav-list-item">
                <IconButton
                  target="_blank"
                  href={blogUrl + '/preview-longform/' + postName}
                  disabled={activeTab === 'difundir'}
                >
                  <Visibility />
                </IconButton>
              </li>
            </ul>
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  }
}
