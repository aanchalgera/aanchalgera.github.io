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
            <option value='top-left' defaultValue={(this.props.captionPosition == 'top-left' ? 'top-left' : '')}>Top left</option>
            <option value='top-right' defaultValue={(this.props.captionPosition == 'top-right' ? 'top-right' : '')}>Top right</option>
            <option value='bottom-left' defaultValue={(this.props.captionPosition == 'bottom-left' ? 'bottom-left' : '')}>Bottom left</option>
            <option value='bottom-right' defaultValue={(this.props.captionPosition == 'bottom-right' ? 'bottom-right' : '')}>Bottom right</option>
          </select>
        </div>
        <div className={'form-group ' + disabled}>
          <label htmlFor="exampleInputEmail">overlay background</label>
          <select className="form-control" onChange={this.setCaptionBackground.bind(this)}>
            <option value='white' defaultValue={(this.props.captionBackground == 'white' ? 'white' : '')}>White</option>
            <option value='black' defaultValue={(this.props.captionBackground == 'black' ? 'black' : '')}>Black</option>
          </select>
        </div>
      </span>
    );
  }
}
