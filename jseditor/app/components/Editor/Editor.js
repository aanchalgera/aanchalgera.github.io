import React from 'react';
import Content from './Content';

class Editor extends React.Component{
  render(){
    return (
      <form id="editor-form">
        <div className="form-group">
          <label>Content:</label>
          <Content />
        </div>
        <ul className="nav nav-pills">
          <li className="dropdown">
            <a href="#" data-toggle="dropdown" className="dropdown-toggle active">Dropdown <b className="caret"></b></a>
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
                  <li><label className="radio-inline"><input type="radio" value="" />Left</label></li>
                  <li><label className="radio-inline"><input type="radio" value="" />Centre</label></li>
                  <li><label className="radio-inline"><input type="radio" value="" />Right</label></li>
                </ul>
              </li>
              <li>
                <a href="#">Columns</a>
                <ul className="dropdown-menu sub-menu">
                  <li><input type="number" /></li>
                </ul>
              </li>    
            </ul>
          </li>
        </ul>
      </form>
    )
  }
};

export default Editor;