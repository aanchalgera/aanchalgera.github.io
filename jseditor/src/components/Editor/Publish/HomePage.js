/* @flow */
import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

type Props = {
  homepage: Object,
  updateHomepageContent: Function
};

export default class Homepage extends React.PureComponent {
  props: Props;

  getDraftJSEditor() {
    if (this.props.homepage.content === null) {
      return null;
    }
    return (
      <div>
        <label className="caption-default">
          Texto para portada<span> (opcional)</span>
        </label>
        <DraftJSEditor
          ref="homepageContent"
          value={this.props.homepage.content}
          updateResource={this.props.updateHomepageContent}
        />
        <Divider />
      </div>
    );
  }

  render() {
    return <div>{this.getDraftJSEditor()}</div>;
  }
}
