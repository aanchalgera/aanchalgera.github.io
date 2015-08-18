import React from 'react';
import Content from './Content';

class ContentList extends React.Component{
  render(){
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + i;
      return (
        <div className="container-ul-iiner" data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.props.dragEnd.bind(this)}
            onDragStart={this.props.dragStart.bind(this)}>
          <Content
            key={i}
            dataId={i}
            type={field.type}
            data={field}
            index={index}
            addNewTextArea={this.props.addNewTextArea.bind(this)} />
        </div>
      )
    });
    return (
      <div className="col-sm-6 content-area container-ul" id="main-container">
        <ul id ="myList" onDragOver={this.props.dragOver.bind(this)}>{fields}</ul>
      </div>
    )
  }
};

export default ContentList;
