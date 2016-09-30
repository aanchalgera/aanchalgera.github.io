import React from 'react';

class AddAltText extends React.Component {
  attachImages(e) {
    e.preventDefault();
    if ('' == this.props.addImageModule) {
      let image = this.props.selectedImages[0];
      image.alt = this.refs.alt.value;
      this.props.addImage(image);
    }
    return this.props.closePanel(e);
  }

  render () {
    var thumbnails = [];
    thumbnails = this.props.selectedImages.map(image => {
      return (
        <img
          key={image['public_id']}
          src={image['thumbnail_url']}
        />
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
                    <li>
                      <input type="text" ref="alt" placeholder="Add alternate text" className="form-control" />
                      {thumbnails}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary show-alt" onClick={this.attachImages.bind(this)}>Insert images</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAltText;
