import React from 'react';
import PropertyButtonContent from './PropertyButtonContent';

class PropertyButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {box : 'close'};
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
    var moreProperties = '';
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
    switch (this.props.type) {
      case 'content' :
        moreProperties = <PropertyButtonContent
        addBackgroundColorToResource={this.props.addBackgroundColorToResource}
        openResourcePanel={this.props.openResourcePanel}
        />
    }
    return (
      <ul>
        <ul className="nav-pills2"><li>
          <button type="button" onClick={this.expandBox.bind(this)} className="btn btn-default btn-properties" style={closeStyle}>Properties</button>
       	</li></ul>
	<ul className="nav nav-pills nav-pills2 js-properties-container" style={expandStyle}>
          <li>
            <span className="btn-group" role="group" aria-label="...">
	      {moreProperties}
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
