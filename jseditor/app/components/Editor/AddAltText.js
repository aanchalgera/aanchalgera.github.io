import React from 'react';

class AddAltText extends React.Component {
  constructor(props) {
    super(props);
    this.attachImages = this.attachImages.bind(this);
  }

  attachImages(e) {
    e.preventDefault();
    let images = this.props.selectedImages, isEmptyAltVal = false;

    images.map((image, i) => {
      if ('' == this._altElements[i].value.trim()) {
        isEmptyAltVal = true;
      }
      image.alt = this._altElements[i].value;
    });

    if (isEmptyAltVal) {
      return this.refs.altError.style.display = 'block';
    }

    if ('' == this.props.addImageModule) {
      this.props.addImage(images[0]);
    } else if ('edit' == this.props.imageFunction) {
      this.props.editImages(images);
    } else {
      this.props.addImages(images, this.props.addImageModule);
    }

    return this.props.closePanel(e);
  }

  render () {
    this._altElements = [];
    const thumbnails = this.props.selectedImages.map((image, i) => {
      return (
        <li key={image.public_id}>
          <input type="text" ref={c => this._altElements[i] = c} placeholder="Add alternate text" className="form-control" />
          <img src={image.thumbnail_url} />
        </li>
      );
    }); 
    return (
      <div className="modal fade in" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={(e) => this.props.closePanel(e)}><span>×</span></button>
              <h4 className="modal-title">Resources</h4>
              <span className="hint">Click to select each image you want to add to the slider</span>
            </div>
            <div className="modal-body">
              <div className="resources-panel-images">
                <div className="alt-container show">
                  <ul>
                    {thumbnails}
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <span className="text-danger" ref="altError" style={{display: 'none'}}> Add alternate value before inserting image(s) </span>
              <button type="button" className="btn btn-primary show-alt" onClick={this.attachImages}>Insert image(s)</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAltText;
