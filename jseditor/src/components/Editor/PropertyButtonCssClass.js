import React from 'react';

class PropertyButtonCssClass extends React.Component{
  handleClick (ev) {
    this.props.addGroupToResource(ev);
  }

  render () {
    return (
      <ul className="list-size">
        <h5>Group</h5>
        <li>
          <button onClick={this.handleClick.bind(this)} data-group="group group-1" type="button" className={'btn  btn-default ' + (this.props.group == 'group group-1' ? 'active' : '')}>1</button>
          <button onClick={this.handleClick.bind(this)} data-group="group group-2" type="button" className={'btn  btn-default ' + (this.props.group == 'group group-2' ? 'active' : '')}>2</button>
          <button onClick={this.handleClick.bind(this)} data-group="group group-3" type="button" className={'btn  btn-default ' + (this.props.group == 'group group-3' ? 'active' : '')}>3</button>
          <button onClick={this.handleClick.bind(this)} data-group="group group-4" type="button" className={'btn  btn-default ' + (this.props.group == 'group group-4' ? 'active' : '')}>4</button>
          <button onClick={this.handleClick.bind(this)} data-group="group group-5" type="button" className={'btn  btn-default ' + (this.props.group == 'group group-5' ? 'active' : '')}>5</button>
        </li>
      </ul>
    );
  }
}

export default PropertyButtonCssClass;
