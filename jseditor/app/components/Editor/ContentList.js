import React from 'react';
import Content from './Content';

class ContentList extends React.Component{
  render(){
    var previousAlign = '', alignmentError = '';
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + field.id;
      if (previousAlign == 'section-align-left' && field.alignment != 'section-align-right') alignmentError = true; 
      else if (previousAlign != 'section-align-left' && field.alignment == 'section-align-right') alignmentError = true; 
      previousAlign = field.alignment;
      return (
          <Content
            key={index}
            dataId={i}
            type={field.type}
            data={field}
            index={index}
	    alignmentError={alignmentError} 
            addNewTextArea={this.props.addNewTextArea.bind(this)}
            addClassToResource={this.props.addClassToResource.bind(this)}
            dragEnd={this.props.dragEnd.bind(this)}
            dragStart={this.props.dragStart.bind(this)}
            updateText={this.props.updateText.bind(this)} />
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
