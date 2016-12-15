import React from 'react';

export default class Thumbnail extends React.Component {
  constructor (props) {
    super(props);
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(e) {
    if ('image' == this.props.imageFunction) {
      return this.props.addResourcePanelSelectedImages([this.props.data], e);
    }

    switch(this.props.addImageModule) {
      case '':
      case 'backgroundImage':
        this.props.addImage(this.props.data);
        return this.props.closePanel(e);
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
