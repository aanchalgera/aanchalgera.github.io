import React from 'react';
import PropertyButtonUngroup from './PropertyButtonUngroup';
import PropertyButtonContent from './PropertyButtonContent';
import PropertyButtonSizes from './PropertyButtonSizes';
import PropertyButtonTable from './PropertyButtonTable';
import AutoplaySliderButton from './AutoplaySliderButton';

class PropertyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { box: 'close' };
  }

  toggleBox() {
    this.setState({ box: this.state.box == 'open' ? 'close' : 'open' });
  }

  closeBox() {
    this.setState({ box:'close' });
  }

  render() {
    var expandStyle = '';
    var selected = '';
    var sizeProperties = '';
    var showPropertiesBox;
    var groupProperties = '';
    var tableProperties = '';
    var autoPlaySliderButton = '';
    var deleteButton = '';
    if (this.state.box == 'open') {
      expandStyle = { display: 'block' };
      selected = 'selected';
    } else {
      expandStyle = { display: 'none' };
    }

    switch (this.props.data.type) {
      case 'grouped':
        groupProperties = (
          <PropertyButtonUngroup
            dataId={this.props.dataId}
            ungroupSections={this.props.ungroupSections}
          />
        );
        break;
      case 'slider' :
        autoPlaySliderButton = (
          <AutoplaySliderButton
            dataId={this.props.dataId}
            autoplay={this.props.autoplay}
            setAutoPlaySlider={this.props.setAutoPlaySlider}
          />
        );
        sizeProperties = (
          <PropertyButtonSizes
            dataId={this.props.dataId}
            layout={this.props.layout}
            addLayoutToResource={this.props.addLayoutToResource}
            dataType={this.props.data.type}
          />
        );
        break;
      case 'image' :
      case 'gallery' :
      case 'video':
      case 'summary':
      case 'title':
      case 'giphy':
      case 'infogram':
      case 'datawrapper':
      case 'table':
      case 'review':
        sizeProperties = (
          <PropertyButtonSizes
            dataId={this.props.dataId}
            layout={this.props.layout}
            addLayoutToResource={this.props.addLayoutToResource}
            dataType={this.props.data.type}
          />
        );
        break;
    }
    var bgProperties = (
      <PropertyButtonContent
        addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
        data={this.props.data}
        openResourcePanel={this.props.openResourcePanel}
        dataId={this.props.dataId}
      />
    );

    var bgOptionsAllowedForGroupedTypes = { content: true, summary: true, richContent: true };
    var showPropertiesBoxForGroupedTypes = { content: true, summary: true, richContent: true, slider: true };
    if (this.props.grouped != 'true') {
      showPropertiesBox = true;
    } else if (showPropertiesBoxForGroupedTypes[this.props.data.type] == true) {
      showPropertiesBox = true;
    } else {
      showPropertiesBox = false;
    }

    if ('title' != this.props.data.type) {
      deleteButton = (
        <button onClick={this.props.deleteResource} className="btn btn-default btn-block btn-delete">
          Delete Section <span type="button" className="glyphicon glyphicon-trash "></span>
        </button>
      );
    }
    switch (this.props.data.type) {
      case 'table':
      case 'review':
        tableProperties = (
          <PropertyButtonTable
            dataId={this.props.dataId}
            useEqualWidth={this.props.data.useEqualWidth}
            updateResource={value => this.props.updateResource(this.props.dataId, { useEqualWidth: value })}
          />
        );
        break;
    }
    var propertyButton = (
      <ul className="nav-pills2 js-nav-properties">
        <li><button type="button" onClick={this.toggleBox.bind(this)} className={'btn btn-default glyphicon glyphicon-cog ' + selected}></button></li>
      </ul>
    );
    return (
      <ul>
        {showPropertiesBox == true ? propertyButton : ''}
        <span className="properties-container js-properties-container" style={expandStyle} onMouseLeave={this.closeBox.bind(this)}>
          {this.props.grouped != 'true' ? bgProperties : (bgOptionsAllowedForGroupedTypes[this.props.data.type] == true ? bgProperties : '')}
          {autoPlaySliderButton}
          {groupProperties}
          {this.props.grouped == 'true' ? '' : sizeProperties}
          {tableProperties}
          {this.props.grouped == 'true' ? '' : deleteButton}
        </span>
      </ul>
    );
  }
}

export default PropertyButton;
