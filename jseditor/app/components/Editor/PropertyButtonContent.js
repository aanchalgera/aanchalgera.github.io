import React from 'react';

class PropertyButtonContent extends React.Component {
  render() {
    var whiteBackgroundColor = '';
    if (this.props.backgroundColor != '' &&  this.props.backgroundColor != '#FFF') {
      whiteBackgroundColor = <li data-color="#FFF" onClick={this.props.addBackgroundColorToResource} className="background-white">White</li>
    }
    return (
      <span className="btn-group dropdown" role="group">
    		<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      		Background
      		<span className="caret"></span>
    		</button>
    		<ul className="dropdown-menu">
      		  <li onClick={this.props.openResourcePanel.bind(this,'backgroundImage',this.props.dataId)}>Background Image</li>
            <li className="divider" role="separator"></li>
      		  <li>Background Colour</li>
            <li data-color="#000" onClick={this.props.addBackgroundColorToResource.bind(this)} className="background-black">color</li>
      		  <li data-color="#4b8a20" onClick={this.props.addBackgroundColorToResource.bind(this)} className="background-green">color</li>
      		  <li data-color="#d8022a" onClick={this.props.addBackgroundColorToResource.bind(this)} className="background-red">color</li>
            {whiteBackgroundColor}
    		</ul>
  	</span>
	)
  }
}

export default PropertyButtonContent;
