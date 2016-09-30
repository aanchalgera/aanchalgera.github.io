import React from 'react';

export default class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(e) {
    if ('' == this.props.addImageModule) {
      return this.props.addResourcePanelSelectedImages([this.props.data], e);
    } else if ('image' == this.props.addImageModule) {
      this.props.editImages(this.props.data);
    }
    e.currentTarget.className = e.currentTarget.className == 'active' ? '' : 'active';
  }
  render () {
    return (
      <li>
        <img
          src={this.props.data.thumbnail_url}
          draggable="false"
          title = {this.props.data.original_filename}
          onClick={this.selectImage}
          data-image={JSON.stringify(this.props.data)}
        />
        <span>{this.props.data.original_filename}.{this.props.data.format}</span>
      </li>
    );
  }
}
