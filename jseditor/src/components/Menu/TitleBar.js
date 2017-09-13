import React from 'react';
import { IconButton, FlatButton } from 'material-ui';
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
    const { postName, blogUrl, activeTab, showDifundir, blogName } = this.props;
    return (
      <Toolbar>
        <ToolbarTitle text={blogName} style={styles.title} />
        <ToolbarGroup>
          <Tabs
            value={activeTab}
            onChange={this.handleChange}
            style={styles.tabs}
          >
            <Tab label="ESCRIBIR" value="escribir" />
            <Tab label="PUBLICAR" value="publicar" />
            {showDifundir && <Tab label="DIFUNDIR" value="difundir" />}
          </Tabs>
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton label="Publicado" style={styles.publishButton} />
          <IconButton
            target="_blank"
            href={blogUrl + '/preview-longform/' + postName}
            style={styles.previewButton}
            disabled={activeTab === 'difundir'}
          >
            <Visibility />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
