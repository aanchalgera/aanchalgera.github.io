import React from 'react';

export default class ImageCaptionPropertyButton extends React.Component {

  toggleCheck(e) {
    let {checked, id} = e.currentTarget;
    this.setState(
      this.props.addImageCaptionOverlay.bind(this, id, checked, this.props.fieldId)
    );
  }

  setPosition(e) {
    let {value, id} = e.currentTarget;
    this.setState(
      this.props.addImageCaptionOverlayPosition.bind(this, id, value, this.props.fieldId)
    );
  }

  setCaptionBackground(e) {
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
          <label><input defaultChecked={this.props.captionOverlay} type="checkbox" onClick={this.toggleCheck.bind(this)} />Caption-overlay</label>
        </div>
        <div className={'form-group ' + disabled}>
          <label htmlFor="exampleInputEmail">Position</label>
          <select className="form-control" defaultValue={this.props.captionPosition} onChange={this.setPosition.bind(this)}>
            <option value='top-left'>Top left</option>
            <option value='top-right'>Top right</option>
            <option value='bottom-left'>Bottom left</option>
            <option value='bottom-right'>Bottom right</option>
          </select>
        </div>
        <div className={'form-group ' + disabled}>
          <label htmlFor="exampleInputEmail">overlay background</label>
          <select className="form-control" defaultValue={this.props.captionBackground} onChange={this.setCaptionBackground.bind(this)}>
            <option value='white'>White</option>
            <option value='black'>Black</option>
          </select>
        </div>
      </span>
    );
  }
}
