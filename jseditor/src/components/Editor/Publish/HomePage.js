/* @flow */
import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

type Props = {
  homepage: Object,
  updateHomepageContent: Function
};

export default class Homepage extends React.Component {
  props: Props;
  state = {};

  updateLength = length => {
    this.setState({ length });
  };

  getDraftJSEditor() {
    if (this.props.homepage.content === null) {
      return null;
    }
    return (
      <div className="editor-container">
        <label className="caption-default label-editor">
          Texto para portada (opcional) <span>{this.state.length}</span>
        </label>
        <DraftJSEditor
          ref="homepageContent"
          value={this.props.homepage.content}
          updateResource={this.props.updateHomepageContent}
          updateLength={this.updateLength}
        />
        <Divider />
      </div>
    );
  }

  render() {
    return <div>{this.getDraftJSEditor()}</div>;
  }
}
