import React from 'react';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.editResource = this.editResource.bind(this);
  }

  editResource(e) {
    switch (this.props.type) {
      case 'image':
        this.props.openResourcePanel('edit', {currentIndex: this.props.dataId}, 'image', false, e);
        break;
      case 'video':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'table':
        this.props.toggleEditMode();
        break;
    }
  }

  render() {
    return (
      <div className="hover-nav hover-nav-single">
        <div aria-label="..." role="group" className="btn-group btn-group-sm">
          <button type="button" className={'btn btn-default' + (this.props.edit ? ' btn-edit' : '')} onClick={this.editResource}>
            <span className="glyphicon glyphicon-pencil" title={'Edit ' + this.props.type}></span>
          </button>
        </div>
      </div>
    );
  }
}
