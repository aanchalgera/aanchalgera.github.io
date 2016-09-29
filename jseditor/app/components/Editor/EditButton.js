import React from 'react';

export default class EditButton extends React.Component {
  editResource(currentIndex, e) {
    switch (this.props.data.type) {
      case 'image':
        this.props.openResourcePanel('edit', {currentIndex}, 'image', false, e);
        break;
      case 'video':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
        this.props.editResource(currentIndex);
        break;
    }
  }

  render() {
    return (
      <div className="hover-nav hover-nav-single">
        <div aria-label="..." role="group" className="btn-group btn-group-sm">
          <button type="button" className="btn btn-default" onClick={this.editResource.bind(this, this.props.dataId)}>
            <span className="glyphicon glyphicon-pencil" title={'Edit ' + this.props.data.type}></span>
          </button>
        </div>
      </div>
    );
  }
}
