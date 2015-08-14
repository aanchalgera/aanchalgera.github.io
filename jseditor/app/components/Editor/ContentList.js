import React from 'react';
import Content from './Content';

var map = [];
var counter = 0;

class ContentList extends React.Component{
  render(){
    var fields = this.props.fields.map((text, i) => {
      var index = "text-area" + i;
      return (
        <div className="container-ul-iiner">
          <Content key={i} dataId={i} text={text} index={index} addNewTextArea={this.props.addNewTextArea.bind(this)} />
        </div>
      )
    });
    return (
      <div className="col-sm-6 content-area container-ul" id="main-container">
        {fields}
      </div>
    )
  }
};

export default ContentList;
