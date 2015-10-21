import React, { PropTypes } from 'react';
import Content from './Content';
import PropertyButton from './PropertyButton';

class ContentGrouped extends React.Component{
  componentDidMount() {
    var element = '#div-'+this.props.index;
    document.querySelector(element).setAttribute('style',this.props.getStyleText(this.props.data));
    document.querySelector(element).classList.add(this.props.data.backgroundClass);
  }
  componentDidUpdate() {
    var element = '#div-'+this.props.index;
    document.querySelector(element).setAttribute('style',this.props.getStyleText(this.props.data));
    document.querySelector(element).classList.add(this.props.data.backgroundClass);
  }
  render () {
    var groupedClass = "conatiner-columns-"+this.props.data.length;
    var _this = this;
    var {data,index,...other} = this.props;
    var fields = this.props.data.columns.map(function(field, i) {
      var index = "text-area" + field.id;
      return (<div key={i} className="column-1">
      <Content
        data = {field}
        {...other}
        grouped='true'
        index={index}
        dataId={_this.props.dataId +"-"+ i}
        />
      </div>)
      });
      var minimized = (this.props.orderMode && this.props.minimize) ? 'minimised' : '';
      return (
        <div className={"container-ul-inner "+groupedClass+" "+minimized+" "+this.props.data.backgroundClass}
         id={"div-"+this.props.index}
         data-id={this.props.dataId}
         key={this.props.data.key}
         >
           {fields}
           <PropertyButton
             align={this.props.data.align}
             layout={this.props.data.layout}
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
