/*eslint-disable*/
import React from 'react';
import ImageCaption from './ImageCaption';

class Image extends React.Component {
  render() {
    var imageCaption =
      this.props.data.description !== undefined
        ? this.props.data.description
        : '';

    return (
      <div className={'asset-size-' + this.props.data.layout}>
        <img
          id={'img' + this.props.data.id}
          data-id={this.props.dataId}
          src={this.props.data.url}
          alt={this.props.data.alt}
        />
        <ImageCaption
          id={'img' + this.props.data.id}
          type={this.props.data.type}
          addImageCaption={this.props.addImageCaption}
          fieldId={this.props.dataId}
          imageCaption={imageCaption}
          captionOverlay={this.props.data.captionOverlay}
          captionPosition={this.props.data.captionPosition}
          captionBackground={this.props.data.captionBackground}
          addImageCaptionOverlay={this.props.addImageCaptionOverlay}
          addImageCaptionOverlayPosition={
            this.props.addImageCaptionOverlayPosition
          }
          addImageCaptionOverlayBackground={
            this.props.addImageCaptionOverlayBackground
          }
        />
      </div>
    );
  }
}

export default Image;
