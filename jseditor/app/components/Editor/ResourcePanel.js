import React from 'react';
import Thumbnail from './Thumbnail';

class ResourcePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageList: []
    };
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.images.length > 0) {
        this.setState({imageList: nextProps.images})
    }
  }
  closePanel(event) {
    event.preventDefault();
    document.getElementById('resourcePanel').style.display = 'none';
  }
  addImages() {
    var selectedImages = document.querySelectorAll('#imageList img.active');
    var images = [];
    if (selectedImages.length == 0) {
      return
    }
    for (var i = 0; i < selectedImages.length; i++) {
      images.push(JSON.parse(selectedImages[i].dataset.image))
      selectedImages[i].className = '';
    }
    if ('gallery' == this.props.addmodule) {
      this.props.addGallery(images);
    } else if ('slider' == this.props.addmodule) {
      this.props.addSlider(images);
    }
  }
  render () {
    var showGalleryButton = '';
    if ('gallery' == this.props.addmodule) {
      var showGalleryButton = <button
        id="add-gallery"
        type="button"
        className="btn btn-primary add-gallery"
        disabled={!this.props.slug}
        onClick={this.addImages.bind(this)}>Add gallery to post</button>;
    }
    var showSliderButton = '';
    if ('slider' == this.props.addmodule) {
      var showSliderButton = <button
        id="add-slider"
        type="button"
        className="btn btn-primary add-slider"
        disabled={!this.props.slug}
        onClick={this.addImages.bind(this)}>Add slider to post</button>;
    }
    var images = [];
    var images = this.state.imageList.map((data, i) => {
      return (
        <Thumbnail
          key={data.public_id}
          data={data}
          addImage={this.props.addImage}
          addmodule={this.props.addmodule}
        />
      )
    });
    return (
      <div className="modal fade" id="resourcePanel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: "none"}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" id="closePanel" onClick={this.closePanel.bind(this)} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="myModalLabel">Resources</h4>
            </div>
            <div className="modal-body">
             <div className="resources-panel-images">
               <ul id="imageList">{images}</ul>
             </div>
            </div>
            <div className="modal-footer">
              <button
                id={this.props.uploaderId}
                type="button"
                className="btn btn-primary"
                disabled={!this.props.slug}
                onClick={this.props.handleClick}>Upload Images</button>
              {showGalleryButton}
              {showSliderButton}
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default ResourcePanel;
