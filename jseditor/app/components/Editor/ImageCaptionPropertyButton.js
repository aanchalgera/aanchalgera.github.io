import React from 'react';

class ImageCaptionPropertyButton extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleCheck(e) {
    var data = e.currentTarget.checked;
    var imageId = e.currentTarget.id;
    this.setState(
      this.props.addImageCaptionOverlay.bind(this, imageId, data, this.props.fieldId));
  }

  setPosition(e) {
    e.preventDefault();
    var data = e.currentTarget.value;
    var imageId = e.currentTarget.id;
    this.setState(
      this.props.addImageCaptionOverlayPosition.bind(this, imageId, data, this.props.fieldId));
  }

  setCaptionBackground(e) {
    e.preventDefault();
    var data = e.currentTarget.value;
    var imageId = e.currentTarget.id;
    this.setState(
      this.props.addImageCaptionOverlayBackground.bind(this, imageId, data, this.props.fieldId));
  }

  render() {
    var disabled = 'field-disabled';
    if (this.props.captionOverlay == 'checked') {
      disabled = '';
    }

    return (
      <span className="caption-form" style={this.props.expandStyle} onMouseLeave={this.props.closeBox.bind(this)}>
        <div className="checkbox">
          <label><input checked={this.props.captionOverlay} type="checkbox" onClick={this.toggleCheck.bind(this)} />Caption-overlay</label>
        </div>
        <div className={'form-group ' + disabled}>
          <label htmlFor="exampleInputEmail">Position</label>
          <select className="form-control" onChange={this.setPosition.bind(this)}>
            <option value='topLeft' selected={(this.props.captionPosition == 'topLeft' ? 'selected' : '')}>Top left</option>
            <option value='topRight' selected={(this.props.captionPosition == 'topRight' ? 'selected' : '')}>Top right</option>
            <option value='bottomLeft' selected={(this.props.captionPosition == 'bottomLeft' ? 'selected' : '')}>Bottom left</option>
            <option value='bottomRight' selected={(this.props.captionPosition == 'bottomRight' ? 'selected' : '')}>Bottom right</option>
          </select>
        </div>
        <div className={'form-group ' + disabled}>
          <label htmlFor="exampleInputEmail">overlay background</label>
          <select className="form-control" onChange={this.setCaptionBackground.bind(this)}>
            <option value='white' selected={(this.props.captionBackground == 'white' ? 'selected' : '')}>White</option>
            <option value='black' selected={(this.props.captionBackground == 'black' ? 'selected' : '')}>Black</option>
          </select>
        </div>
      </span>
    );
  }
}

export default ImageCaptionPropertyButton;
