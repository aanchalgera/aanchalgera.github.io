import React from 'react';

class PropertyButtonGroup extends React.Component {
  render() {
    return (
      <ul className="list-layout">
        <h5>Layout</h5>
        <li><label> Group </label>
          <button onClick={this.props.groupSections.bind(this, this.props.dataId, 2)} className="btn btn-default">2 sections </button>
          <button onClick={this.props.groupSections.bind(this, this.props.dataId, 3)} className="btn btn-default">3 sections </button>
        </li>
      </ul>
      )
  }
}

export default PropertyButtonGroup;
