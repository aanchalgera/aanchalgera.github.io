import React from 'react';

export default class EditButton extends React.Component {
  render() {
    let editButton;
    switch (this.props.data.type) {
      case 'image':
        editButton = (
          <button type="button" className="btn btn-default" onClick={(e) => this.props.openResourcePanel('edit', {currentIndex: this.props.dataId}, 'image', false, e)}>
            <span className="glyphicon glyphicon-pencil" title="Edit Image"></span>
          </button>
        );
        break;
      case 'video':
        editButton = (
          <button type="button" className="btn btn-default" onClick={(e) => this.props.updateVideo('edit', this.props.dataId, e)}>
            <span className="glyphicon glyphicon-pencil" title="Edit Video"></span>
          </button>
        );
        break;
    }
    return (
      <div className="hover-nav hover-nav-single">
        <div aria-label="..." role="group" className="btn-group btn-group-sm">
          {editButton}
        </div>
      </div>
    );
  }
}
