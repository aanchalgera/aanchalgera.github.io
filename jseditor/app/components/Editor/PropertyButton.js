import React from 'react';

class PropertyButton extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills nav-pills2">
        <li className="dropdown">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle active dd1">Properties <b className="caret"></b></a>
          <ul className="dropdown-menu" id="menu1">
            <li>
              <a href="#">Background Image</a>
              <ul className="dropdown-menu sub-menu">
                <li><input type="url" /></li>
              </ul>
            </li>
            <li>
              <a href="#">Align</a>
              <ul className="dropdown-menu sub-menu">
                <li><a href="#">Left</a></li>
                <li><a href="#">Right</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
}

export default PropertyButton;
