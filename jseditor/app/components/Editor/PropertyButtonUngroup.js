import React from 'react';

class PropertyButtonUngroup extends React.Component {
  render() {
    return (
      <ul className="list-layout">
        <h5>Layout</h5>
        <li><label> Group </label>
          <button type='button' onClick={this.props.ungroupSections.bind(this, this.props.dataId)} className="btn btn-default">Ungroup </button>
        </li>
      </ul>
    );
  }
}

export default PropertyButtonUngroup;
