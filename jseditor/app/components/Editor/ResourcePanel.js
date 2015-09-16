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
    var selectedImages = document.querySelectorAll('input[name=imagecheckboxes]:checked');
    var images = [];
    if (selectedImages.length == 0) {
      return
    }
    for (var i = 0; i < selectedImages.length; i++) {
      images.push(JSON.parse(selectedImages[i].dataset.image))
    }
    this.props.addImages(images);
  }
  render () {
    var showGalleryButton = '';
    if (this.props.addgallery != 'hidden') {
      var showGalleryButton = <button
        id="add-gallery"
        type="button"
        className="btn btn-primary add-gallery"
        disabled={!this.props.slug}
        onClick={this.addImages.bind(this)}>Add gallery to post</button>;
    }
    var images = [];
    var images = this.state.imageList.map((data, i) => {
      return (
        <Thumbnail
          key={data.public_id}
          data={data}
          addImage={this.props.addImage}
          addgallery={this.props.addgallery}
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
               <ul>{images}</ul>
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
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default ResourcePanel;
