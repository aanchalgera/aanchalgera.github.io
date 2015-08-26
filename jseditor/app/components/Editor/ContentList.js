import React from 'react';
import Content from './Content';

class ContentList extends React.Component{
  render(){
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + field.id;
      return (
          <Content
            key={index}
            dataId={i}
            type={field.type}
            data={field}
            index={index}
            addNewTextArea={this.props.addNewTextArea.bind(this)}
	     addClassToResource={this.props.addClassToResource.bind(this)}
            dragEnd={this.props.dragEnd.bind(this)}
            dragStart={this.props.dragStart.bind(this)} />
      )
    });
    return (
      <div className="col-sm-12 content-area container-ul" id="main-container">
        <ul id ="myList" onDragOver={this.props.dragOver.bind(this)} >{fields}</ul>
      </div>
    )
  }
};

export default ContentList;
