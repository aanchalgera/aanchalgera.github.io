import React from 'react';

class Thumbnail extends React.Component {
  render () {
    return (
      <img
        alt="some title"
        src={this.props.data.thumbnail_url}
        draggable="true"
        data-src={this.props.data.url}
        data-height={this.props.data.height}
        data-width={this.props.data.width}
        onDragStart={this.props.dragImageStart.bind(this)}
        onDragEnd={this.props.dragImageEnd.bind(this)}
      />
    )
  }
}

export default Thumbnail;
