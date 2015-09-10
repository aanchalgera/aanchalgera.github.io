import React from 'react';

class MoreOptions extends React.Component {
  render() {
    return (
      <div className="add-more-options"><a className="btn-circle glyphicon glyphicon-plus" title="Add image, video, slider, new section" />
        <span className="add-options">
          <a href="#" className="btn-circle glyphicon" onClick={this.props.addTextArea.bind(this,this.props.dataId)} title="Add new section">T</a>
          <a href="#" className="btn-circle glyphicon glyphicon-picture" onClick={this.props.openResourcePanel.bind(this,'image', this.props.dataId)} title="Add Image" />
        </span>
        <span className="hint">Add images, video, slider and new section.</span>
      </div>
	)
  }
}

export default MoreOptions;