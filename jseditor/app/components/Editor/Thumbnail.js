import React from 'react';

export default class Thumbnail extends React.Component {
  selectImage(data, e) {
    if ('' == this.props.addImageModule) {
      this.props.addImage(data);
      return;
    }
    e.currentTarget.className = e.currentTarget.className == 'active' ? '' : 'active';
  }
  render () {
    return (
      <li>
        <img
          src={this.props.data.thumbnail_url}
          draggable="false"
          onClick={this.selectImage.bind(this, this.props.data)}
          data-image={JSON.stringify(this.props.data)}
        />
      </li>
    );
  }
}
