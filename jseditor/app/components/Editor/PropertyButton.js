import React from 'react';
import PropertyButtonContent from './PropertyButtonContent';
import PropertyButtonImageSizes from './PropertyButtonImageSizes';

class PropertyButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {box : 'close'};
  }

  toggleBox() {
    this.setState({box:this.state.box=='open' ? 'close' : 'open'});
  }

  render() {
    var leftAlignActive = "", rightAlignActive = "",singleColumnActive="";
    var closeStyle = '',expandStyle='', selected='';
    var moreProperties = '';
    var moreImageProperties = '';
    var alignProperties = '';
    if (this.state.box == 'open') {
      closeStyle = {display : 'none'}
      expandStyle = {display : 'block'}
      selected="selected";
    } else {
      closeStyle = {display : 'block'}
      expandStyle = {display : 'none'}
    }
    if (this.props.type != 'gallery') {
      if (this.props.align == 'section-align-left') {
         leftAlignActive = 'active';
      } else if (this.props.align == 'section-align-right') {
          rightAlignActive = 'active';
      } else if (this.props.align == '') {
          singleColumnActive = 'active';
      }
      alignProperties =
        <ul className="list-layout">
          <h5>Layout</h5>
          <li>
            <button data-align="" onClick={this.props.addClassToResource.bind(this)} className={"btn btn-default btn-block "+singleColumnActive}>Single Column</button>
            <button data-align="section-align-left" onClick={this.props.addClassToResource.bind(this)} className={"btn btn-default "+leftAlignActive}>Column left</button>
            <button data-align="section-align-right" onClick={this.props.addClassToResource.bind(this)} className={"btn btn-default pull-right "+rightAlignActive}>Column right</button>
           </li>
        </ul>
    }
    switch (this.props.type) {
      case 'content' :
      case 'summary':
      case 'richContent':
        moreProperties = <PropertyButtonContent
          addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
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
          <button type="button" onClick={this.toggleBox.bind(this)} className="btn btn-default glyphicon glyphicon-cog {selected}"></button>
        </li></ul>
        <span className="properties-container js-properties-container" style={expandStyle}>
          {moreProperties}
          {alignProperties}
          {moreImageProperties}
          <button onClick={this.props.deleteResource.bind(this)} className="btn btn-default btn-block btn-delete selected">Delete Section <span type="button" className="glyphicon glyphicon-trash "></span></button>
        </span>
      </ul>
    )
  }
}

export default PropertyButton;
