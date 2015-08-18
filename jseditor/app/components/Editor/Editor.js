import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';

var map = [];
var placeholder = document.createElement("div");
placeholder.className = "placeholder";

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fields: [
        {
          id: 1,
          type: "content",
          text: "Some content"
        },
        {
          id: 2,
          type : "image",
          url : "http://img.weblogssl.com/g/longform/vodafone-220715/imagesdesktop/primerordenador.jpg",
          alt : "primer juego ordenador",
          extension : "jpg",
          alignment : "",
          width : 500,
          height : 341,
          class : "alignleft attachment-large"
        },
        {
          id : 3,
          type : "content",
          text : "Some more content"
        }
      ]
    };
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    document.getElementById("myList").removeChild(placeholder);
    // Update state
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    this.state.fields.splice(to, 0, this.state.fields.splice(from, 1)[0]);
    this.setState({fields: this.state.fields});
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
  addNewTextArea(event) {
    map[event.keyCode] = event.type == 'keydown';
    if (map[91] && map[13]) {
      var currentIndex = Number(event.target.dataset.id);
      this.state.fields.splice(
        currentIndex+1,0, {
          id: Math.ceil((Math.random())*100),
          type: "content",
          text: ""
        }
      );
      this.setState({fields: this.state.fields});
      map = [];
    }
  }
  render(){
    return (
      <form id="editor-form">
        <div className="form-group">
          <label className="col-sm-2 control-label">Title</label>
          <PostTitle />
          <label className="col-sm-2 control-label">Content:</label>
          <ContentList
            fields={this.state.fields}
            addNewTextArea={this.addNewTextArea.bind(this)}
            dragStart={this.dragStart.bind(this)}
            dragEnd={this.dragEnd.bind(this)}
            dragOver={this.dragOver.bind(this)} />
        </div>
        <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
      </form>
    )
  }
};

export default Editor;
