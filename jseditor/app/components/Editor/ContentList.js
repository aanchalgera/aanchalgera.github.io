import React from 'react';
import Content from './Content';
import ContentGrouped from './ContentGrouped';
import MoreOptions from './MoreOptions';

class ContentList extends React.Component{
  render(){
    var previousAlign = '', alignError = '';
    var {dragOver,fields,...other} = this.props;
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + field.id;
      var moreOptions = <MoreOptions
        openResourcePanel={this.props.openResourcePanel}
        addTextArea={this.props.addTextArea}
        addVideo={this.props.addVideo}
        groupSections={this.props.groupSections}
        dataId={i}
      />;
      if (field.type == 'grouped') {
        var content = <ContentGrouped
          dataId={i}
          data={field}
          index={index}
          {...other}
          ></ContentGrouped>
      } else {
        var content = <Content
          dataId={i}
          data={field}
          index={index}
          {...other}
        />
      }
      return (
        <div key={index} className={"container-data"}>
          {moreOptions}
          {content}
      </div>
      )
    });
    return (
      <div className="col-sm-12 content-area container-ul" id="main-container">
        <ul id ="myList" onDragOver={this.props.dragOver.bind(this)} >{fields}</ul>
          <MoreOptions
            openResourcePanel={this.props.openResourcePanel}
            addTextArea={this.props.addTextArea}
            addVideo={this.props.addVideo}
            dataId={fields.length}
            key={fields.length}
            groupSections={this.props.groupSections}
          />
      </div>
    )
  }
};

export default ContentList;
