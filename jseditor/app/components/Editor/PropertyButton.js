import React from 'react';

class PropertyButton extends React.Component {
  render() {
    var leftAlignActive = "", rightAlignActive = "";
    if (this.props.alignment == 'section-align-left') {
	leftAlignActive = 'active';
    } else if (this.props.alignment == 'section-align-right') {
        rightAlignActive = 'active';
    }
    return (
	<ul className="nav nav-pills nav-pills2">
      	  <div className="btn-group">
   	    <button onClick={this.props.addClassToResource} aria-label="Left Align" className={"btn btn-default" + leftAlignActive} type="button"><span data-alignment="section-align-left" aria-hidden="true" className="glyphicon glyphicon-align-left"></span></button>
   	    <button onClick={this.props.addClassToResource} aria-label="Right Align" className={"btn btn-default "+ rightAlignActive} type="button"><span data-alignment="section-align-right" aria-hidden="true" className="glyphicon glyphicon-align-right"></span></button>
   	    <button aria-label="Delete" className="btn btn-default" type="button"><span aria-hidden="true" className="glyphicon glyphicon-trash"></span></button>
      	  </div>
      	</ul>
    )
  }
}

export default PropertyButton;
