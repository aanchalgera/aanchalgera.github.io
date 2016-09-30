import React from 'react';
import Thumbnail from './Thumbnail';
import AddAltText from './AddAltText';

class ResourcePanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imageList: [],
      resourcePanelSelectedImages: []
    };
    this.addResourcePanelSelectedImages = this.addResourcePanelSelectedImages.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.images.length > 0) {
      this.setState({imageList: nextProps.images});
    }
  }

  addResourcePanelSelectedImages(images, e) {
    e.preventDefault();
    this.setState({resourcePanelSelectedImages: images });
  }

  closePanel(event) {
    event.preventDefault();
    this.refs.resourcePanel.style.display = 'none';
    this.setState({ resourcePanelSelectedImages: [] });
  }

  getStyle() {
    return this.refs.resourcePanel;
  }

  addImages(e) {
    var selectedImages = this.refs.resourcePanel.querySelectorAll('#imageList img.active');
    var images = [];
    if (selectedImages.length == 0) {
      return;
    }
    for (var i = 0; i < selectedImages.length; i++) {
      images.push(JSON.parse(selectedImages[i].dataset.image));
      selectedImages[i].className = '';
    }
    if (this.props.imageFunction == 'edit') {
      this.props.editImages(images);
    } else {
      this.props.addImages(images, this.props.addImageModule);
    }
    this.closePanel(e);
  }
  render () {
    var showGalleryButton = '';
    if ('gallery' == this.props.addImageModule) {
      showGalleryButton = (
        <button
          id="add-gallery"
          type="button"
          className="btn btn-primary add-gallery"
          disabled={!this.props.slug}
          onClick={this.addImages.bind(this)}
        >
          Add gallery to post
        </button>
      );
    }
    var showSliderButton = '';
    if ('slider' == this.props.addImageModule) {
      showSliderButton = (
        <button
          id="add-slider"
          type="button"
          className="btn btn-primary add-slider"
          disabled={!this.props.slug}
          onClick={this.addImages.bind(this)}
        >
          Add slider to post
        </button>
      );
    }
    var images = [];
    images = this.state.imageList.map(data => {
      return (
        <Thumbnail
          key={data.public_id}
          data={data}
          addImage={this.props.addImage}
          addImageModule={this.props.addImageModule}
          editImages={this.props.editImages}
          addResourcePanelSelectedImages={this.addResourcePanelSelectedImages}
        />
      );
    });
    let addAltText = null;
    if (this.state.resourcePanelSelectedImages.length > 0) {
      addAltText = (
        <AddAltText
          selectedImages={this.state.resourcePanelSelectedImages}
          addImageModule={this.props.addImageModule}
          addImage={this.props.addImage}
          closePanel={this.closePanel}
        />
      );
    }
    return (
      <div>
        <div className="modal fade" ref="resourcePanel" id="resourcePanel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" id="closePanel" onClick={this.closePanel.bind(this)} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel">Resources</h4>
              </div>
              <div className="modal-body">
               <div className="resources-panel-images">
                 <ul ref="imageList" id="imageList">{images}</ul>
               </div>
              </div>
              <div className="modal-footer">
                <button
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
        {addAltText}
      </div>
    );
  }
}

export default ResourcePanel;
