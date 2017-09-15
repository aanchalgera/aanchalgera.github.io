/* @flow */
import React from 'react';
import DraftJSEditor from './DraftJSEditor';

type Props = {
  homepage: Object,
  updateHomepageContent: Function
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
          updateResource={this.props.updateHomepageContent}
        />
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
