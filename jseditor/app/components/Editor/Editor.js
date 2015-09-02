import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';
import CloudinaryUploader from './CloudinaryUploader';
import axios from 'axios';

var placeholder = document.createElement("div");
placeholder.className = "placeholder";
var delta = 500;
var lastKeypressTime = 0;

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nextId: 3,
      value: null,
      isError: false,
      errorMessage: null,
      fields: [
        {
          id: 1,
          type: "content",
          text: "<b>Some content</b>",
          align: "section-align-left",
          backgroundColor : ""
        },
        {
          id: 2,
          type : "image",
          url : "http://res.cloudinary.com/realarpit/image/upload/v1440420623/quf8pgbjsj1hojwhomkk.jpg",
          alt : "primer juego ordenador",
          banner : false,
          parallax : false,
          width : 500,
          height : 622,
          align: "section-align-right",
          backgroundColor : ""
        },
        {
          id : 3,
          type : "content",
          text : "Some more content",
	  align : "",
	  backgroundColor : ""
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
    this.imageAlt = this.dragged.dataset.alt;
    this.imageSrc = this.dragged.dataset.src;
    this.imageHeight = this.dragged.dataset.height;
    this.imageWidth = this.dragged.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  dragImageEnd(e) {
    this.state.nextId++;
    this.dragged.style.display = "block";
    document.getElementById("myList").removeChild(placeholder);
    // Update state
    var currentIndex = Number(this.over.dataset.id);
    this.state.fields.splice(
      currentIndex,0, {
        id: this.state.nextId,
        type: "image",
        url: this.imageSrc,
        height: this.imageHeight,
        width: this.imageWidth,
        alt: this.imageAlt,
        banner : false,
        parallax : false,
	 align: "",
        backgroundColor: "",
      }
    );
    this.setState({
      fields: this.state.fields,
      nextId: this.state.nextId
    });
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
    this.state.nextId++;
    this.state.fields.splice(
      currentIndex+1,0, {
      id: this.state.nextId,
      type: "content",
      text: "",
      align: "",
      backgroundColor: "",
      backgroundImage: ""
    });
    this.setState({
      fields: this.state.fields,
      nextId: this.state.nextId
    });
  }
  handleChange (ev) {
    this.setState({
      value : ev.currentTarget.value
    });
  }
  submitForm (ev) {
    ev.preventDefault();
    if (undefined == this.state.value) {
      this.setError(true,'Title should not be empty');
      return
    } else {
      this.setError({isError: false, errorMessage: null});
    }
    var data = {
      title : this.state.value,
      sections : this.state.fields
    };
    data = JSON.stringify(data);
    axios({
      url : '/submit',
      method: 'POST',
      data : data
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });
  }
  setError (isError, errorMessage){
    this.setState({
      isError: isError,
      errorMessage: errorMessage
    });
  }
  addClassToResource(event)
  {
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.dataset.align;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.align = (obj.align == value) ? "" : value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields});
  }
  addBackgroundColorToResource(event)
  {
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.dataset.color;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.backgroundColor = (obj.color == value) ? "" : value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields});
  }
  updateText(event)
  {
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.innerHTML;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.text = value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields});
  }
  render(){
    var errorField = this.state.isError ? <p>{this.state.errorMessage}</p> : null;
    return (
      <div className="col-sm-12 main">
        <form id="editor-form" onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label className="col-sm-12 control-label">Title</label>
            <PostTitle value={this.state.value} handleChange={this.handleChange.bind(this)} />
            <label className="col-sm-12 control-label">Content:</label>
            <ContentList
              fields={this.state.fields}
              addNewTextArea={this.keyHandler.bind(this)}
              dragStart={this.dragStart.bind(this)}
              dragEnd={this.dragEnd.bind(this)}
              dragOver={this.dragOver.bind(this)}
              addClassToResource={this.addClassToResource.bind(this)}
              addBackgroundColorToResource={this.addBackgroundColorToResource.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
          <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
        </form>
        {errorField}
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
