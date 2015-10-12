import React, { PropTypes } from 'react';
import Content from './Content';
import PropertyButton from './PropertyButton';

class ContentGrouped extends React.Component{
  render () {
    var groupedClass = "conatiner-columns-"+this.props.group;
    var _this = this;
    var {data,index,...other} = this.props;
    var fields = this.props.data.columns.map(function(field, i) {
      var index = "text-area" + field.id;
      return (<div key={i} className={"column-1"} style={{height:"200px", overflow:"hidden"}}>
      <Content
        data = {field}
        {...other}
        grouped='true'
        index={index}
        dataId={_this.props.dataId + i}
        />
      </div>)
      });

      return (
        <div className={"container-ul-inner "+groupedClass}
         id={"div-"+this.props.index}
         data-id={this.props.dataId}
         key={this.props.data.key}
         >
           {fields}
           <PropertyButton
             align={this.props.data.align}
             layout={this.props.data.layout}
             addClassToResource={this.props.addClassToResource}
             addBackgroundOptionToResource={this.props.addBackgroundOptionToResource}
             openResourcePanel={this.props.openResourcePanel}
             deleteResource={this.props.deleteResource}
             data={this.props.data}
             dataId={this.props.dataId}
             addLayoutToResource={this.props.addLayoutToResource}
             groupSections={this.props.groupSections}
             ungroupSections={this.props.ungroupSections}
           />
        </div>
      )
  }
}

export default ContentGrouped;
