import React from 'react';
import ImageCaption from './ImageCaption';

class Image extends React.Component {
  render () {
    var imageCaption = this.props.data.description != undefined ? this.props.data.description : '';
    var captionPosition = this.props.data.captionPosition != 'bottomLeft' ? this.props.data.captionPosition : 'bottomLeft';
    var captionBackground = this.props.data.captionBackground != 'white' ? this.props.data.captionBackground : 'white';
    var captionOverlay = this.props.data.captionOverlay != '' ? 'checked' : '';

    return (
      <div className={'asset-size-' + this.props.data.layout}>
        <img
          id={'img' + this.props.data.id}
          data-id={this.props.dataId}
          src={this.props.data.url}
          height={this.props.data.height}
          width={this.props.data.width}
        />
        <ImageCaption
          id={'img' + this.props.data.id}
          type={this.props.data.type}
          addImageCaption={this.props.addImageCaption.bind(this)}
          fieldId={this.props.dataId}
          imageCaption={imageCaption}
          captionOverlay={captionOverlay}
          captionPosition={captionPosition}
          captionBackground={captionBackground}
          addImageCaptionOverlay={this.props.addImageCaptionOverlay.bind(this)}
          addImageCaptionOverlayPosition={this.props.addImageCaptionOverlayPosition.bind(this)}
          addImageCaptionOverlayBackground={this.props.addImageCaptionOverlayBackground.bind(this)}
        />
      </div>
    );
  }
}

export default Image;
