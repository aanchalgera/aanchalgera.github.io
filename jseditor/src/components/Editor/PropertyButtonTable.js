import React from 'react';

export default class PropertyButtonTable extends React.Component {
  render() {
    return (
      <ul>
        <h5>Columns</h5>
        <li>
          <label className="full-line">
            <input
              ref="equalWidth"
              type="checkbox"
              defaultChecked={this.props.useEqualWidth}
              onChange={() => this.props.updateResource(this.refs.equalWidth.checked)}
            />
            Make all cells equal in width
          </label>
        </li>
      </ul>
    );
  }
}
