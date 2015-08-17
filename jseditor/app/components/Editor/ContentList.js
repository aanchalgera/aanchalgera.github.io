import React from 'react';
import Content from './Content';

var map = [];
var counter = 0;
var placeholder = document.createElement("div");
placeholder.className = "placeholder";

class ContentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : this.props.fields
    };
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
        
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  }        
  dragEnd(e) {
        
    this.dragged.style.display = "block";
    document.getElementById("myList").removeChild(placeholder);
    
    // Update state
    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({data: data});
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder")
	 return;
    this.over = e.target;
    var parentDiv = this.parentDiv(e.target);
    if (parentDiv.parentNode.id != 'myList') return;
    parentDiv.parentNode.insertBefore(placeholder, parentDiv);
  }
  parentDiv(el) {
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == 'div') {
        return el;
      }
    }
}

  render(){
    var fields = this.props.fields.map((text, i) => {
      var index = "text-area" + i;
      return (
        <div className="container-ul-iiner" data-id={i}
            key={i}
            draggable="true"
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}>
          <Content key={i} dataId={i} text={text} index={index} addNewTextArea={this.props.addNewTextArea.bind(this)} />
        </div>
      )
    });
    return (
      <div className="col-sm-6 content-area container-ul" id="main-container">
	<ul id ="myList" onDragOver={this.dragOver.bind(this)}>{fields}</ul>
      </div>
    )
  }
};

export default ContentList;
