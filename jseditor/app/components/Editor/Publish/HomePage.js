import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

class Homepage extends React.Component{
  render () {
    return (
      <div>
        <label>Texto para portado<span>(opcional)</span></label>
        <DraftJSEditor
          ref="homepageContent"
          value={this.props.homepage.content}
          updateResource={(id, type, value) => this.props.updateHomepageContent(value)}
          dataId={this.props.dataId}
        />
        <Divider />
      </div>
    );
  }
}

export default Homepage;
