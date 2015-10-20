import React, { PropTypes } from 'react';

class PropertyButtonSizes extends React.Component{
  handleClick (ev) {
    if (ev.target.dataset.layout == this.props.layout) {
      return;
    }
    this.props.addLayoutToResource(ev);
  }
  render () {
    return (
      <ul className="list-size">
        <h5>Size</h5>
        <li>
          <p className="size-small"><button data-layout="small" onClick={this.handleClick.bind(this)} className={"btn btn-default selected "+(this.props.layout == "small" ? "active" : "")}>Small</button></p>
          <p className="size-normal"><button data-layout="normal" onClick={this.handleClick.bind(this)} className={"btn  btn-default selected "+(this.props.layout == "normal" ? "active" : "")}>Normal</button></p>
          <p className="size-big"><button data-layout="big" onClick={this.handleClick.bind(this)} className={"btn  btn-default selected "+(this.props.layout == "big" ? "active" : "")}>Big</button></p>
          <p className="size-cover"><button data-layout="cover" onClick={this.handleClick.bind(this)} className={"btn btn-default selected "+(this.props.layout == "cover" ? "active" : "")}>Cover</button></p>
        </li>
      </ul>
    )
  }
}

export default PropertyButtonSizes;
