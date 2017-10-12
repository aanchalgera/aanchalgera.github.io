import React from 'react';
import { IconButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Visibility from 'material-ui/svg-icons/action/visibility';

const styles = {
  previewButton: {
    marginTop: '8px'
  },
  publishButton: {
    marginTop: '16px'
  },
  title: {
    color: 'white',
    textTransform: 'capitalize'
  },
  tabs: {
    width: '500px'
  }
};

export default class TitleBar extends React.Component {
  handleChange = route => {
    const { history, postName, queryPath } = this.props;
    const url = 'escribir' === route ? 'edit/post' : route;
    history.push(`/${url}/${postName}${queryPath}`);
  };

  render() {
    let statusMsgElement = null;

    if (this.props.showPostStatusMsg) {
      statusMsgElement = (
        <span className="caption-default">
          {this.props.statusMsg}
        </span>
      );
    }

    const { postName, blogUrl, activeTab, showDifundir, blogName } = this.props;
    return (
      <Toolbar className="header">
        <ToolbarTitle text={blogName} style={styles.title} />
        <ToolbarGroup>
          <Tabs
            value={activeTab}
            onChange={this.handleChange}
            style={styles.tabs}
          >
            <Tab 
              label="ESCRIBIR"
              value="escribir"
              className='btn-nav'
            />
            <Tab 
              label="PUBLICAR"
              value="publicar"
              className='btn-nav'
            />
            {showDifundir && <Tab label="DIFUNDIR" value="difundir" />}
          </Tabs>
        </ToolbarGroup>
        <ToolbarGroup>
          <div>
            {statusMsgElement}
            <span>
              <IconButton
                target="_blank"
                href={blogUrl + '/preview-longform/' + postName}
                style={styles.previewButton}
                disabled={activeTab === 'difundir'}
              >
                <Visibility />
              </IconButton>
            </span>
          </div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
