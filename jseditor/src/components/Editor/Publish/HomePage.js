/* @flow */
import * as React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

type Props = {
  homepage: Object,
  updateHomepageContent: Function
};

type State = {
  length?: number
};

export default class Homepage extends React.PureComponent<Props, State> {
  state = {};

  updateLength = (length: number) => {
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
