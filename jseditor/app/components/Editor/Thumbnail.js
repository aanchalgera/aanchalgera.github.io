import React from 'react';

class Thumbnail extends React.Component {
  render () {
    return (
      <li>
        <img
          src={this.props.data.thumbnail_url}
          draggable="false"
        />
      </li>
    )
  }
}

export default Thumbnail;
