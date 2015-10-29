import React from 'react';
import PropertyButtonUngroup from './PropertyButtonUngroup';
import PropertyButtonContent from './PropertyButtonContent';
import PropertyButtonSizes from './PropertyButtonSizes';

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
      case 'image' :
        var moreImageProperties = <PropertyButtonSizes
          dataId={this.props.dataId}
          layout={this.props.layout}
          addLayoutToResource={this.props.addLayoutToResource}
        />
    }
    switch (this.props.data.type) {
      case 'content' :
      case 'summary':
      case 'richContent':
      case 'grouped':
      case 'video':
      case 'image':
        moreProperties = <PropertyButtonContent
          addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
          data={this.props.data}
          openResourcePanel={this.props.openResourcePanel}
          dataId={this.props.dataId}
        />
        break;
    }
    var deleteButton = <button onClick={this.props.deleteResource.bind(this)} className="btn btn-default btn-block btn-delete">Delete Section <span type="button" className="glyphicon glyphicon-trash "></span></button>
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
