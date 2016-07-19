import React from 'react';

class PropertyButtonSizes extends React.Component{
  handleClick (ev) {
    if (ev.target.dataset.layout == this.props.layout) {
      return;
    }

    this.props.addLayoutToResource(ev);
  }

  render () {
    let extraButtons = null;
    if ('title' == this.props.dataType) {
      extraButtons = (
        <span>
          <p className="size-big"><button type='button' data-layout="big" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'big' ? 'active' : '')}>Big</button></p>
        </span>
      );
    } else if ('summary' != this.props.dataType) {
      extraButtons = (
        <span>
          <p className="size-big"><button type='button' data-layout="big" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'big' ? 'active' : '')}>Big</button></p>
          <p className="size-cover"><button type='button' data-layout="cover" onClick={this.handleClick.bind(this)} className={'btn btn-default selected ' + (this.props.layout == 'cover' ? 'active' : '')}>Cover</button></p>
        </span>
      );
    }
    return (
      <ul className="list-size">
        <h5>Size</h5>
        <li>
          <p className="size-small"><button type='button' data-layout="small" onClick={this.handleClick.bind(this)} className={'btn btn-default selected ' + (this.props.layout == 'small' ? 'active' : '')}>Small</button></p>
          <p className="size-normal"><button type='button' data-layout="normal" onClick={this.handleClick.bind(this)} className={'btn  btn-default selected ' + (this.props.layout == 'normal' ? 'active' : '')}>Normal</button></p>
          {extraButtons}
        </li>
      </ul>
    );
  }
}

export default PropertyButtonSizes;
