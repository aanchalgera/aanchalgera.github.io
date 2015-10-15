import React from 'react';

class MoreOptions extends React.Component {
  render() {
    var twoColumnButton = <button className="btn" onClick={this.props.groupSections.bind(this, this.props.dataId, 2)} title="2 Columns"> 2 Columns</button>
    var threeColumnButton = <button className="btn" onClick={this.props.groupSections.bind(this, this.props.dataId, 3)} title="3 Columns"> 3 Columns</button>
    return (
      <div className="add-more-options">
        <button className="btn glyphicon glyphicon-plus" title="Add image, video, slider, new section" ></button>
        <span className="add-options">
          <button className="btn glyphicon glyphicon-text" onClick={this.props.addTextArea.bind(this,this.props.dataId,"content")} title="Add new section">T</button>
          <button className="btn glyphicon glyphicon-camera" onClick={this.props.openResourcePanel.bind(this,'image', this.props.dataId, false, false)} title="Add Image" ></button>
          <button className="btn glyphicon glyphicon-file" onClick={this.props.addTextArea.bind(this,this.props.dataId,"summary")} title="Add Summary"></button>
          <button className="btn glyphicon glyphicon-facetime-video" onClick={this.props.addVideo.bind(this,this.props.dataId)} title="Add Video"></button>
          <button className="btn glyphicon glyphicon-picture" onClick={this.props.openResourcePanel.bind(this,'image', this.props.dataId, true, false)} title="Add Gallery" ></button>
          <button className="btn glyphicon glyphicon-console" onClick={this.props.addTextArea.bind(this,this.props.dataId,"richContent")} title="Add rich content snippet"></button>
          {this.props.show2column?twoColumnButton:''}
          {this.props.show3column?threeColumnButton:''}
        </span>
        <span className="hint">Add images, video, slider and new section.</span>
      </div>
	)
  }
}

export default MoreOptions;
