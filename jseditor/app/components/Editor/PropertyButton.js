import React from 'react';

class PropertyButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {box : 'open'};
  }
 
  expandBox() {
    this.setState({box:'open'});
  }
  closeBox() {
    this.setState({box:'close'});
  }

  render() {
    var leftAlignActive = "", rightAlignActive = "";
    var closeStyle = '',expandStyle='';
    if (this.props.align == 'section-align-left') {
	leftAlignActive = 'active';
    } else if (this.props.align == 'section-align-right') {
        rightAlignActive = 'active';
    }
    if (this.state.box == 'open') {
      closeStyle = {display : 'none'}
      expandStyle = {display : 'block'}
    } else { 
      closeStyle = {display : 'block'}
      expandStyle = {display : 'none'}
    }
    return (
      <ul>
        <ul className="nav-pills2"><li>
          <button type="button" onClick={this.expandBox.bind(this)} className="btn btn-default btn-properties" style={closeStyle}>Properties</button>
       	</li></ul>
	<ul className="nav nav-pills nav-pills2 js-properties-container" style={expandStyle}>
          <li>
            <span className="btn-group" role="group" aria-label="...">
              <span className="btn-group dropdown" role="group">
    		<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      		Background
      		<span className="caret"></span>
    		</button>
    		<ul className="dropdown-menu">
      		  <li><a href="#" className="background-image">Background Image</a></li>
               	  <li className="divider" role="separator"></li>
      		  <li><a>Background Colour</a></li>
      		  <li data-color="#000" onClick={this.props.addBackgroundColorToResource} className="background-black"></li>
      		  <li data-color="#4b8a20" onClick={this.props.addBackgroundColorToResource} className="background-green"></li>
      		  <li data-color="#d8022a" onClick={this.props.addBackgroundColorToResource} className="background-red"></li>
    		</ul>
  	      </span>
  	      <button data-align="section-align-left" onClick={this.props.addClassToResource} type="button" className={"btn btn-default "+leftAlignActive}>Column Left</button>
  	      <button data-align="section-align-right" onClick={this.props.addClassToResource} type="button" className={"btn btn-default " + rightAlignActive}>Column Right</button> 
  	      <button type="button" className="btn btn-default">Delete</button>
  	      <button onClick={this.closeBox.bind(this)} type="button" className="btn btn-default btn-proeprties-close">X</button>
	    </span>
          </li>
        </ul>
      </ul>
    )
  }
}

export default PropertyButton;
