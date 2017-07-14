import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

class Homepage extends React.Component{
  static propTypes = {
    homepage: React.PropTypes.object.isRequired,
    updateHomepageContent: React.PropTypes.func.isRequired,
    dataId: React.PropTypes.number,
  }

  getDraftJSEditor() {
    let editor = '';
    if (this.props.homepage.content !== null) {
      editor = <div>
        <label>Texto para portado<span>(opcional)</span></label>
        <DraftJSEditor
          ref="homepageContent"
          value={this.props.homepage.content}
          updateResource={(id, type, value) => this.props.updateHomepageContent(value)}
          dataId={this.props.dataId}
        />
        <Divider />
      </div>;
    }
    return editor;
  }

  render () {
    return (
      <div>
        {this.getDraftJSEditor()}
      </div>
    );
  }
}

export default Homepage;
