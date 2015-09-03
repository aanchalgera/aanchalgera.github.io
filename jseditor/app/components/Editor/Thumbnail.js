import React from 'react';

class Thumbnail extends React.Component {
  render () {
    return (
      <li>
        <img
          src={this.props.data.thumbnail_url}
          draggable="false"
          onClick={this.props.addImage.bind(this, this.props.data.url)}
        />
      </li>
    )
  }
}

export default Thumbnail;
