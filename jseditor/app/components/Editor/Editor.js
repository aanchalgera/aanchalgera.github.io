import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';
import CloudinaryUploader from './CloudinaryUploader';
import axios from 'axios';
import PreviewPanel from './PreviewPanel';
import ReactRouter from 'react-router';
import slug from 'slug';

var placeholder = document.createElement("div");
placeholder.className = "placeholder";
var delta = 500;
var lastKeypressTime = 0;

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nextId: 0,
      value: null,
      isError: false,
      errorMessage: null,
      resourcePanelOpenedBy : null,
      imageFunction : null,
      fields: []
    };
  }
  init(){
    var postname = "posts/" + this.router.getCurrentParams().postname;
    if (undefined != postname) {
      this.props.base.fetch(postname, {
        context: this,
        then(data){
          console.log(data);
          if (null != data) {
            this.setState({
              id : data.id,
              fields: data.sections,
              value: data.title
            });
          }
        }
      });
    }
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  componentDidMount(){
    this.init();
  }
  openResourcePanel(imageFunction, currentIndex, event) {
    if (undefined != event) {
      event.preventDefault();
    }
    this.setState({
      resourcePanelOpenedBy: currentIndex,
      imageFunction: imageFunction
    });
    document.getElementById('resourcePanel').style.display = 'block'
    document.getElementById('resourcePanel').classList.add('in')
  }
  addImage(image) {
    var currentIndex = this.state.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      var obj = this.state.fields.splice(currentIndex, 1)[0];
      obj.backgroundImage = image.url;
      this.state.fields.splice(currentIndex, 0, obj);
    } else if (this.state.imageFunction == 'image') {
      this.state.nextId++;
      this.state.fields.splice(
      currentIndex,0, {
        id: this.state.nextId,
        type: "image",
        url: image.url,
        height: image.imageHeight,
        width: image.imageWidth,
        alt: image.imageAlt,
        banner : false,
        parallax : false,
	      align: ""
      });
    }
    this.setState({
      fields: this.state.fields,
      nextId: this.state.nextId
    });
    document.getElementById('resourcePanel').style.display = 'none'
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
        event.preventDefault();
        var parentDiv = this.parentDiv(event.target);
        this.createNewTextArea(Number(parentDiv.dataset.id) + 1);
        // optional - if we'd rather not detect a triple-press
        // as a second double-press, reset the timestamp
        //thisKeypressTime = 0;
      }
      lastKeypressTime = thisKeypressTime;
    }
  }
   createNewTextArea(currentIndex, event) {
    if (undefined != event) {
      event.preventDefault();
    }
    this.state.nextId++;
    this.state.fields.splice(
      currentIndex,0, {
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
    var postSlug = slug(this.state.value, {lower: true});
    var data = {
      "id" : postSlug,
      "title" : this.state.value,
      "sections" : this.state.fields
    };
    this.props.base.post(
      'posts/'+ postSlug, {
      data: data
    });
  }
  setError (isError, errorMessage){
    this.setState({
      isError: isError,
      errorMessage: errorMessage
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
  deleteResource()
  {
    var confirmation = confirm("Are you sure you want to delete this?");
    if (confirmation == true) {
      var currentIndex = this.parentDiv(event.target).dataset.id;
      this.state.fields.splice(currentIndex, 1);
      this.setState({fields: this.state.fields});
    }
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
  openPreviewPanel(event) {
    event.preventDefault();
    if (undefined == this.state.value) {
      this.setError(true,'Title should not be empty');
      return
    } else {
      this.setError({isError: false, errorMessage: null});
    }
    var data = {
      id : slug(this.state.value, {lower: true}),
      title : this.state.value,
      sections : this.state.fields
    };
    data = JSON.stringify(data);
    axios({
      url : 'http://52.19.39.251:81/parse',
      method: 'POST',
      data : data
    })
    .then(function (response) {
      console.log(response);
      var random  = Math.round(Math.random() * 10000000);
      React.render(<PreviewPanel src={"abc.html?" + random} />, document.getElementById('preview'));
      document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          document.getElementById('previewPanel').style.display = 'none';
        }
      };
      document.getElementById('previewPanel').style.display = 'block';
      document.getElementById('previewPanel').classList.add("in");
    })
      .catch(function (response) {
        console.log(response);
      });
  }
  render(){
    var errorField = this.state.isError ? <p>{this.state.errorMessage}</p> : null;
    return (
      <div>
        <a className="btn btn-primary" href="#" onClick={this.openPreviewPanel.bind(this)}>Preview</a>
        <a className="btn btn-primary" href="/">List Page</a>
        <form id="editor-form" onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">
            <label className="col-sm-12 control-label">Title</label>
            <PostTitle value={this.state.value} handleChange={this.handleChange.bind(this)} />
            <ContentList
              fields={this.state.fields}
              addNewTextArea={this.keyHandler.bind(this)}
              dragStart={this.dragStart.bind(this)}
              dragEnd={this.dragEnd.bind(this)}
              dragOver={this.dragOver.bind(this)}
              addClassToResource={this.addClassToResource.bind(this)}
              addBackgroundColorToResource={this.addBackgroundColorToResource.bind(this)}
              updateText={this.updateText.bind(this)}
              openResourcePanel={this.openResourcePanel.bind(this)}
              addTextArea={this.createNewTextArea.bind(this)}
              deleteResource={this.deleteResource.bind(this)}
            />
          </div>
          <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
        </form>
        {errorField}
        <CloudinaryUploader
          cloudName='realarpit'
          uploadPreset='h2sbmprz'
          addImage={this.addImage.bind(this)}
        />
        <div id="preview"></div>
      </div>
    )
  }
};

Editor.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Editor;
