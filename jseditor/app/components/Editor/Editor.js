import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';
import CloudinaryUploader from './CloudinaryUploader';

var placeholder = document.createElement("div");
placeholder.className = "placeholder";
var delta = 500;
var lastKeypressTime = 0;

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fields: [
        {
          id: 1,
          type: "content",
          text: "<b>Some content</b>",
	  alignment: "left"
        },
	{
          id: 2,
          type : "image",
          url : "http://img.weblogssl.com/g/longform/vodafone-220715/imagesdesktop/primerordenador.jpg",
          alt : "primer juego ordenador",
          extension : "jpg",
          alignment : "right",
          width : 500,
          height : 341,
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
    var temp = this.state.fields.splice(from, 1)[0];
    this.state.fields.splice(to, 0, temp);
    this.setState({fields: this.state.fields});
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    var parentDiv = this.parentDiv(e.target);
    if (parentDiv.parentNode.id != 'myList') return;
    parentDiv.parentNode.insertBefore(placeholder, parentDiv);
  }
  dragImageStart(e) {
    this.dragged = e.currentTarget;
    this.imageSrc = this.dragged.dataset.src;
    this.imageHeight = this.dragged.dataset.height;
    this.imageWidth = this.dragged.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  dragImageEnd(e) {
    this.dragged.style.display = "block";
    document.getElementById("myList").removeChild(placeholder);
    // Update state
    var currentIndex = Number(this.over.dataset.id);
    this.state.fields.splice(
      currentIndex+1,0, {
        id: Math.ceil((Math.random())*100),
        type: "image",
        src: this.imageSrc,
        height: this.imageHeight,
        width: this.imageWidth
      }
    );
    this.setState({fields: this.state.fields});
  }
  parentDiv(el) {
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == 'div') {
        return el;
      }
    }
  }
  keyHandler(event)
  {
    if (event.keyCode == 13 )
    {
      var thisKeypressTime = new Date();
      if ( thisKeypressTime - lastKeypressTime <= delta )
      {
    	var parentDiv = this.parentDiv(event.target);
        this.addNewTextArea(Number(parentDiv.dataset.id));
        // optional - if we'd rather not detect a triple-press
        // as a second double-press, reset the timestamp
        //thisKeypressTime = 0;
      }
      lastKeypressTime = thisKeypressTime;
    }
  }
  addNewTextArea(currentIndex ) {
      this.state.fields.splice(
        currentIndex+1,0, {
          id: Math.ceil((Math.random())*100),
          type: "content",
          text: ""
        }
      );
      this.setState({fields: this.state.fields});
  }
  render(){
    return (
      <div>
        <form id="editor-form">
          <div className="form-group">
            <label className="col-sm-2 control-label">Title</label>
            <PostTitle />
            <label className="col-sm-2 control-label">Content:</label>
            <ContentList
              fields={this.state.fields}
              addNewTextArea={this.keyHandler.bind(this)}
              dragStart={this.dragStart.bind(this)}
              dragEnd={this.dragEnd.bind(this)}
              dragOver={this.dragOver.bind(this)}
            />
          </div>
          <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
        </form>
        <CloudinaryUploader
          cloudName='realarpit'
          uploadPreset='h2sbmprz'
          dragImageStart={this.dragImageStart.bind(this)}
          dragImageEnd={this.dragImageEnd.bind(this)}
        />
      </div>
    )
  }
};

export default Editor;
