import React from 'react';
import ImageCaption from './ImageCaption';

class Image extends React.Component {
  render () {
    var imageCaption = this.props.data.description != undefined ? this.props.data.description : '';
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
          addImageCaption={this.props.addImageCaption.bind(this)}
          fieldId={this.props.dataId}
          imageCaption={imageCaption}
          limit=""
        />
      </div>
    );
  }
}

export default Image;
