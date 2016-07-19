import React from 'react';

export default class ImageCaptionPropertyButton extends React.Component {

  toggleCheck(e) {
    let {checked, id} = e.currentTarget;
    this.setState(
      this.props.addImageCaptionOverlay.bind(this, id, checked, this.props.fieldId)
    );
  }

  setPosition(e) {
    e.preventDefault();
    let {value, id} = e.currentTarget;
    this.setState(
      this.props.addImageCaptionOverlayPosition.bind(this, id, value, this.props.fieldId)
    );
  }

  setCaptionBackground(e) {
    e.preventDefault();
    let {value, id} = e.currentTarget;
    this.setState(
      this.props.addImageCaptionOverlayBackground.bind(this, id, value, this.props.fieldId)
    );
  }

  render() {
    let disabled = (this.props.captionOverlay) ? '' : 'field-disabled';

    return (
      <span className="caption-form" onMouseLeave={this.props.closeCaptionForm.bind(this)}>
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
