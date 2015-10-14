import React from 'react';
import PropertyButtonUngroup from './PropertyButtonUngroup';
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
  closeBox() {
    this.setState({box:'close'});
  }
  render() {
    var closeStyle = '',expandStyle='', selected='';
    var moreProperties = '';
    var moreImageProperties = '';
    var groupProperties = '';
    if (this.state.box == 'open') {
      closeStyle = {display : 'none'}
      expandStyle = {display : 'block'}
      selected="selected";
    } else {
      closeStyle = {display : 'block'}
      expandStyle = {display : 'none'}
    }
    switch (this.props.data.type) {
      case 'grouped':
        groupProperties = <PropertyButtonUngroup
          dataId={this.props.dataId}
          ungroupSections={this.props.ungroupSections}
        />
        break;
    }
    switch (this.props.data.type) {
      case 'content' :
      case 'summary':
      case 'richContent':
      case 'grouped':
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
    var deleteButton = <button onClick={this.props.deleteResource.bind(this)} className="btn btn-default btn-block btn-delete selected">Delete Section <span type="button" className="glyphicon glyphicon-trash "></span></button>
    return (
      <ul>
        <ul className="nav-pills2 js-nav-properties">
          <li><button type="button" onClick={this.toggleBox.bind(this)} className="btn btn-default glyphicon glyphicon-cog {selected}"></button></li>
        </ul>
        <span className="properties-container js-properties-container" style={expandStyle} onMouseLeave={this.closeBox.bind(this)}>
          {moreProperties}
          {groupProperties}
          {moreImageProperties}
          {this.props.grouped=='true'?'':deleteButton}
        </span>
      </ul>
    )
  }
}

export default PropertyButton;
