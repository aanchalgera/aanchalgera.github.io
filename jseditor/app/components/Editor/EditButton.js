import React from 'react';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.openResourcePanel = this.props.openResourcePanel.bind(this);
  }

  render() {
    let editButton;
    switch (this.props.data.type) {
      case 'image':
        editButton = (
          <button type="button" className="btn btn-default" onClick={(e) => this.openResourcePanel('edit', this.props.dataId, '', false, e)}>
            <span className="glyphicon glyphicon-pencil" title="Edit Image"></span>
          </button>
        );
        break;
      case 'video':
        editButton = (
          <button type="button" className="btn btn-default" onClick={() => this.props.data.url = ''}>
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
