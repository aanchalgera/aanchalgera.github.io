import React from 'react';
import Content from './Content';

class ContentList extends React.Component{
  render(){
    var previousAlign = '', alignError = '';
    var {dragOver,fields,...other} = this.props;
    var fields = this.props.fields.map((field, i) => {
      var index = "text-area" + field.id;
      if (previousAlign == 'section-align-left' && field.align != 'section-align-right') alignError = true;
      else if (previousAlign != 'section-align-left' && field.align == 'section-align-right') alignError = true;
      previousAlign = field.align;
      return (
          <Content
            key={index}
            dataId={i}
            type={field.type}
            data={field}
            index={index}
            alignError={alignError}
            {...other}
          />
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
