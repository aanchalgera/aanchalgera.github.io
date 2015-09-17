import React from 'react';
import PropertyButtonContent from './PropertyButtonContent';
import PropertyButtonImageSizes from './PropertyButtonImageSizes';

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
    var moreImageProperties = '';
    var alignProperties = '';
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
    if (this.props.type != 'gallery') {
      alignProperties = <span className="btn-group dropdown" role="group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          One Column
          <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          <li><a data-align="section-align-left" onClick={this.props.addClassToResource.bind(this)} href="#" className={"background-image "+leftAlignActive}>Column left</a></li>
          <li><a data-align="section-align-right" onClick={this.props.addClassToResource.bind(this)} href="#" className={rightAlignActive}>Column right</a></li>
        </ul>
      </span>
    }
    switch (this.props.type) {
      case 'content' :
      case 'summary':
      case 'richContent':
        moreProperties = <PropertyButtonContent
          addBackgroundOptionToResource={this.props.addBackgroundColorToResource}
          data={this.props.data}
          openResourcePanel={this.props.openResourcePanel}
          dataId={this.props.dataId}
        />
        break;
      case 'image' :
        var moreImageProperties = <PropertyButtonImageSizes
          dataId={this.props.dataId}
          layout={this.props.layout}
          addLayoutToResource={this.props.addLayoutToResource}
        />
    }
    return (
      <ul>
        <ul className="nav-pills2 js-nav-properties"><li>
          <button type="button" onClick={this.expandBox.bind(this)} className="btn btn-default btn-properties" style={closeStyle}>Properties</button>
        </li></ul>
        <ul className="nav nav-pills nav-pills2 js-properties-container" style={expandStyle}>
          <li>
            <span className="btn-group" role="group" aria-label="...">
              {moreProperties}
              {alignProperties}
              {moreImageProperties}
              <button type="button" onClick={this.props.deleteResource} className="btn btn-default">Delete</button>
              <button onClick={this.closeBox.bind(this)} type="button" className="btn btn-default btn-proeprties-close">X</button>
            </span>
          </li>
        </ul>
      </ul>
    )
  }
}

export default PropertyButton;
