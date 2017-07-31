import React from 'react';
import ImageCaption from './ImageCaption';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: []
    };
    this.deleteImage = this.props.deleteImage.bind(this);
    this.moveImage = this.props.moveImage.bind(this);
    this.openResourcePanel = this.props.openResourcePanel.bind(this);
  }

  componentDidMount() {
    this.setState({ imageList: this.props.data.images });
  }

  render () {
    const totalImages = this.state.imageList.length;
    var images = this.state.imageList.map((image, i) => {
      image.spid = image.public_id + i;
      var imageCaption = image.description != undefined ? image.description : '';
      var deleteButton = totalImages == 1 ? null : (
        <button className="btn btn-default" onClick={(e) => this.deleteImage({sectionIndex: this.props.dataId, imageIndex: i}, e)}>
          <span className="glyphicon glyphicon-trash" title="Delete Image"></span>
        </button>
      );

      var moveImageUp = totalImages == 1 || i == 0 ? null : (
        <button className="btn btn-default" onClick={(e) => this.moveImage({sectionIndex: this.props.dataId, imageIndex: i, direction: 'left'}, e)}>
          <span className="glyphicon glyphicon-arrow-up" title="Move Image"></span>
        </button>
      );

      var moveImageDown = totalImages == 1 || i == (totalImages - 1) ? null : (
        <button className="btn btn-default" onClick={(e) => this.moveImage({sectionIndex: this.props.dataId, imageIndex: i, direction: 'right'}, e)}>
          <span className="glyphicon glyphicon-arrow-down" title="Move Image"></span>
        </button>
      );

      var editImageButton = (
        <button className="btn btn-default" onClick={(e) => this.openResourcePanel('edit', {currentIndex: this.props.dataId, mode: 'edit', imageIndex: i}, 'gallery', true, e)}>
          <span className="glyphicon glyphicon-pencil" title="Edit Image"></span>
        </button>
      );
      return (
        <li key={i} style={{ backgroundImage: 'url(' + image.url + ')' }}>
          <ImageCaption
            key={image.spid}
            imageId={image.spid}
            addImageCaption={this.props.addImageCaption.bind(this)}
            fieldId={this.props.dataId}
            imageCaption={imageCaption}
          />
          <div className="hover-nav">
            <div className="btn-group btn-group-sm" role="group" aria-label="...">
              {deleteButton}
              {editImageButton}
              {moveImageUp}
              {moveImageDown}
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className="slider">
        <ul className={'asset-size-' + this.props.data.layout}>
          {images}
          <li className="slider-plus"><a href="#" onClick={(e) => this.openResourcePanel('image', this.props.dataId, 'slider', true, e)}><span className="glyphicon glyphicon-plus"></span><br />Add more images</a></li>
        </ul>
      </div>
    );
  }
}

export default Slider;
