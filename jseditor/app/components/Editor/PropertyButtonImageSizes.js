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
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Size
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#" data-layout="normal" className={this.props.layout == "normal" ? "active" : ""} onClick={this.handleClick.bind(this)}> Normal</a></li>
          <li><a href="#" data-layout="cover" className={this.props.layout == "cover" ? "active" : ""} onClick={this.handleClick.bind(this)}> Cover</a></li>
          <li><a href="#" data-layout="big" className={this.props.layout == "big" ? "active" : ""} onClick={this.handleClick.bind(this)}> Big</a></li>
          <li><a href="#" data-layout="small" className={this.props.layout == "small" ? "active" : ""} onClick={this.handleClick.bind(this)}> Small</a></li>
        </ul>
      </span>
    )
  }
}

export default PropertyButtonImageSizes;
