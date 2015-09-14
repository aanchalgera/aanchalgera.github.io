import React, { PropTypes } from 'react';

class PropertyButtonImageSizes extends React.Component{
  handleClick (ev) {
    debugger;
    if (ev.target.dataset.layout == this.props.layout) {
      return;
    }
    this.props.addLayoutToResource(ev);
  }
  render () {
    return (
      <span className="btn-group dropdown" role="group">
        <button type="button" className="btn btn-default dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Size
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#" data-layout="650px" className={this.props.layout == "650px" ? "active" : ""} onClick={this.handleClick.bind(this)}> Normal</a></li>
          <li><a href="#" data-layout="2560px" className={this.props.layout == "2560px" ? "active" : ""} onClick={this.handleClick.bind(this)}> Cover</a></li>
          <li><a href="#" data-layout="1366px" className={this.props.layout == "1366px" ? "active" : ""} onClick={this.handleClick.bind(this)}> Big</a></li>
          <li><a href="#" data-layout="450px" className={this.props.layout == "450px" ? "active" : ""} onClick={this.handleClick.bind(this)}> Small</a></li>
        </ul>
      </span>
    )
  }
}

export default PropertyButtonImageSizes;
