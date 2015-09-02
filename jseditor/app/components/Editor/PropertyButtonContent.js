import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    return (
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
	)
  }
}

export default PropertyButtonContent;
