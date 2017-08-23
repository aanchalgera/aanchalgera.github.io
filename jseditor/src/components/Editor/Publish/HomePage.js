/* @flow */
import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

type Props = {
  homepage: Object,
  updateHomepageContent: Function,
  dataId?: number
};

class Homepage extends React.Component {
  props: Props;

  getDraftJSEditor() {
    if (this.props.homepage.content === null) {
      return null;
    }
    return (
      <div>
        <label>
          Texto para portado<span>(opcional)</span>
        </label>
        <DraftJSEditor
          ref="homepageContent"
          value={this.props.homepage.content}
          updateResource={(id, type, value) =>
            this.props.updateHomepageContent(value)}
          dataId={this.props.dataId}
        />
        <Divider />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.getDraftJSEditor()}
      </div>
    );
  }
}

export default Homepage;
