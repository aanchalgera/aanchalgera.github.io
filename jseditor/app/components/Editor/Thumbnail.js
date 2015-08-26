import React from 'react';

class Thumbnail extends React.Component {
  removeImage (ev) {
    ev.preventDefault();
    ev.currentTarget.parentElement.style.display = 'none';
  }
  render () {
    return (
      <li>
        <a href="#" className="glyphicon glyphicon-remove" onClick={this.removeImage.bind(this)} />
        <img
          src={this.props.data.thumbnail_url}
          draggable="true"
          data-src={this.props.data.url}
          data-height={this.props.data.height}
          data-width={this.props.data.width}
          data-alt={this.props.data.original_filename}
          onDragStart={this.props.dragImageStart.bind(this)}
          onDragEnd={this.props.dragImageEnd.bind(this)}
        />
      </li>
    )
  }
}

export default Thumbnail;
