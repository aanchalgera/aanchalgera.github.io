import React from 'react';
import { IconButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Visibility from 'material-ui/svg-icons/action/visibility';
import Save from 'material-ui/svg-icons/content/save';
import Shuffle from 'material-ui/svg-icons/av/shuffle';

import Expire from './Expire';

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

  getStatusElement() {
    let statusMsgElement = null;

    if (this.props.showPostStatusMsg) {
      statusMsgElement = (
        <span className="caption-inverted">{this.props.statusMsg}</span>
      );
    }
    if (this.props.activeTab === ESCRIBIR) {
      statusMsgElement = (
        <Expire open={this.props.showPostStatusMsg} autoHideDuration={2000}>
          {statusMsgElement}
        </Expire>
      );
    }
    return statusMsgElement;
  }

  render() {
    const { postName, blogUrl, activeTab, showDifundir, blogName } = this.props;

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
              <Tab label="PUBLICAR" value="publicar" />
              {showDifundir && <Tab label="DIFUNDIR" value="difundir" />}
            </Tabs>
          </ToolbarGroup>
        </div>
        <div className="nav-icon">
          <ToolbarGroup>
            {this.getStatusElement()}
            {activeTab === ESCRIBIR && (
              <IconButton onClick={this.props.saveData}>
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
              href={blogUrl + '/preview-longform/' + postName}
              disabled={activeTab === 'difundir'}
            >
              <Visibility />
            </IconButton>
          </ToolbarGroup>
        </div>
      </Toolbar>
    );
  }
}
