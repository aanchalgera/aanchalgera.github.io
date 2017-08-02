import PropTypes from 'prop-types';
import React from 'react';
import DraftJSEditor from './DraftJSEditor';
import Divider from 'material-ui/Divider';

class Homepage extends React.Component{
  static propTypes = {
    homepage: PropTypes.object.isRequired,
    updateHomepageContent: PropTypes.func.isRequired,
    dataId: PropTypes.number,
  }

  getDraftJSEditor() {
    if (this.props.homepage.content === null) {
      return null;
    }
    return <div>
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

  render () {
    return (
      <div>
        {this.getDraftJSEditor()}
      </div>
    );
  }
}

export default Homepage;
