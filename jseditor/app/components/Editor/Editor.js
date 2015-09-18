import React from 'react';
import ContentList from './ContentList';
import PropertyButton from './PropertyButton';
import PostTitle from './PostTitle';
import CloudinaryUploader from './CloudinaryUploader';
import axios from 'axios';
import PreviewPanel from './PreviewPanel';
import {Link} from 'react-router';
import slug from 'speakingurl';

var placeholder = document.createElement("div");
placeholder.className = "placeholder";
var delta = 500;
var lastKeypressTime = 0;

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      maxId: 0,
      value: null,
      isError: false,
      isSubmit: false,
      message: null,
      resourcePanelOpenedBy : null,
      imageFunction : null,
      addgallery: 'hidden',
      addMoreImagesToGallery: false,
      fields: []
    };
  }
  init(){
    var postname = this.router.getCurrentParams().postname;
    if (undefined != postname) {
      this.props.base.fetch("posts/" + postname, {
        context: this,
        then(data){
          if (null != data) {
            this.setState({
              id : data.id,
              fields: data.sections != undefined ? data.sections : [],
              value: data.title,
              maxId: data.maxId
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
    var self = this;
    this.timerId = setInterval(function() {
      self.saveData();
    }, 10000);
    this.init();
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  openResourcePanel(imageFunction, currentIndex, addgallery = 'hidden', addMoreImagesToGallery = false, event) {
    if (undefined != event) {
      event.preventDefault();
    }
    this.setState({
      resourcePanelOpenedBy: currentIndex,
      imageFunction: imageFunction,
      addgallery : addgallery,
      addMoreImagesToGallery: addMoreImagesToGallery
    });
    document.getElementById('resourcePanel').style.display = 'block'
    document.getElementById('resourcePanel').classList.add('in')
  }
  addImage(image) {
    var currentIndex = this.state.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      var obj = this.state.fields.splice(currentIndex, 1)[0];
      obj.backgroundImage = image.url;
      obj.backgroundImageName = image.original_filename;
      this.state.fields.splice(currentIndex, 0, obj);
    } else if (this.state.imageFunction == 'image') {
      this.state.maxId++;
      this.state.fields.splice(
      currentIndex,0, {
        id: this.state.maxId,
        type: "image",
        url: image.url,
        height: image.height != undefined ? image.height : '',
        width: image.width != undefined ? image.width : '',
        alt: image.alt != undefined ? image.alt : '',
        banner : false,
        parallax : false,
        align: "",
        layout: "normal"
      });
    }
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    }, this.saveData());
    document.getElementById('resourcePanel').style.display = 'none';
  }
  addImages(images) {
    var addImagesToGallery = this.state.addMoreImagesToGallery;
    var currentIndex = this.state.resourcePanelOpenedBy;
    if (!addImagesToGallery) {
      this.state.maxId++;
      this.state.fields.splice(
        currentIndex,0, {"id": this.state.maxId, "type" : "gallery", images, "backgroundColor":"#000000"});
    } else {
      for(var i=0;i < images.length;i++) {
        this.state.fields[currentIndex].images.push(images[i])}
    }
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId,
      addImagesToGallery: false,
      addgallery: 'hidden'
    }, this.saveData());
    document.getElementById('resourcePanel').style.display = 'none';
  }
  addVideo(currentIndex) {
    this.state.maxId++;
    this.state.fields.splice(
    currentIndex,0, {
      id: this.state.maxId,
      type: "video",
      url: "",
      align: ""
    });
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    }, this.saveData());
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
  keyHandler(event, currentId)
  {
    if (event.keyCode == 13 )
    {
      var thisKeypressTime = new Date();
      if ( thisKeypressTime - lastKeypressTime <= delta )
      {
        event.preventDefault();
        var parentDiv = this.parentDiv(event.target);
        this.createNewTextArea(Number(currentId) + 1);
      }
      lastKeypressTime = thisKeypressTime;
    }
  }
   createNewTextArea(currentIndex, type = 'content', event='') {
    if ('' != event) {
      event.preventDefault();
    }
    this.state.maxId++;
    this.state.fields.splice(
      currentIndex,0, {
      id: this.state.maxId,
      type: type,
      text: "",
      align: "",
      backgroundColor: "",
      backgroundImage: ""
    });
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    });
  }
  handleChange (ev) {
    this.setState({
      value : ev.currentTarget.value
    });
  }
  handleBlur (ev) {
    var title = ev.currentTarget.value.trim();
    if (undefined == title || '' == title) {
      this.setMessage(true,'Title should not be empty');
      return
    } else {
      this.setMessage(false);
    }
    var postSlug = slug(title);
    if (this.state.id != undefined && this.state.id != '') {
      if (this.state.id != slug(title)) {
        var postSlug = this.state.id;
      }
    }
    this.setState({
      id: postSlug
    }, this.saveData());
  }
  saveData (ev) {
    if (ev != undefined) {
      ev.preventDefault();
    }
    if (undefined == this.state.value || '' == this.state.value.trim()) {
      this.setMessage(true,'Title should not be empty');
      return
    } else if(0 == this.state.fields.length){
      this.setMessage(true,'Please add some content');
      return
    } else {
      this.setMessage(false);
    }
    var postSlug = slug(this.state.value);
    if (this.state.id != undefined || this.state.id == '') {
      if (this.state.id != postSlug) {
        postSlug = this.state.id;
      }
    }
    var data = {
      "id" : postSlug,
      "title" : this.state.value,
      "sections" : this.state.fields,
      "maxId" : this.state.maxId,
    };
    self = this;
    this.props.base.post(
      'posts/' + postSlug, {
      data: data,
      then(data) {
        console.log('autosaved');
      }
    });
  }
  setMessage(isError = false, message, isSubmit = false) {
    this.setState({
      isError: isError,
      message: message,
      isSubmit: isSubmit
    });
  }
  addClassToResource(event)
  {
     event.preventDefault();
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.dataset.align;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.align = (obj.align == value) ? "" : value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields});
  }
  addBackgroundOptionToResource(property, value, event)
  {
     event.preventDefault();
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     switch (property) {
       case 'backgroundColor' :
         obj.backgroundColor = value;
         break;
       case 'foregroundColor' :
         obj.foregroundColor = value;
         break;
       case 'parallax' :
          obj.parallax = !obj.parallax;
          event.target.className = "active";
          break;
        case 'backgroundRepeat' :
          obj.backgroundRepeat = !obj.backgroundRepeat;
          break;
        case 'backgroundFade' :
          obj.backgroundFade = !obj.backgroundFade;
          break;
        case 'removeBackgroundImage' :
          obj.backgroundImage = '';
          break;
       }
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields});
  }
  deleteResource(event)
  {
    var confirmation = confirm("Are you sure you want to delete this?");
    if (confirmation == true) {
      var currentIndex = this.parentDiv(event.target).dataset.id;
      this.state.fields.splice(currentIndex, 1);
      this.setState({fields: this.state.fields}, this.saveData());
    }
  }
  updateText(currentIndex, value)
  {
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.text = value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields}, this.saveData());
  }
  updateSummaryText(currentIndex, event)
  {
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.text = event.target.innerText;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields}, this.saveData());
  }
  updateRichContent(currentIndex, event)
  {
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.text = event.target.value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields}, this.saveData());
  }
  updateVideo(currentIndex, event)
  {
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.url = event.target.value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields}, this.saveData());
  }
  addLayoutToResource(event)
  {
     event.preventDefault();
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.dataset.layout;
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     obj.layout = value;
     this.state.fields.splice(currentIndex, 0, obj);
     this.setState({fields: this.state.fields}, this.saveData());
  }
  openPreviewPanel(event) {
    event.preventDefault();
    if (undefined == this.state.value || '' == this.state.value.trim()) {
      this.setMessage(true,'Title should not be empty');
      return
    } else if(0 == this.state.fields.length){
      this.setMessage(true,'Please add some content');
      return
    } else {
      this.setMessage(false);
    }
    var postSlug = slug(this.state.value);
    var data = {
      id : postSlug,
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
      React.render(<PreviewPanel src={postSlug + ".html?" + random} />, document.getElementById('preview'));
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
    var errorField = '';
    if (this.state.isError) {
      errorField = <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error:</span>{this.state.message}</div>;
    } else if (this.state.isSubmit) {
      errorField = <div className="alert alert-success">
          <strong>{this.state.message}</strong>
        </div>;
    }
    return (
      <div>
        <a className="btn btn-primary" href="#" onClick={this.openPreviewPanel.bind(this)}>Preview</a>
        <Link className="btn btn-primary" to="/">List Page</Link>
        <br /><br />
        {errorField}
        <form id="editor-form" onClick={this.saveData.bind(this)}>
          <div className="form-group">
            <label className="col-sm-12 control-label">Title</label>
            <PostTitle value={this.state.value} handleChange={this.handleChange.bind(this)} handleBlur={this.handleBlur.bind(this)}/>
            <ContentList
              fields={this.state.fields}
              addNewTextArea={this.keyHandler.bind(this)}
              dragStart={this.dragStart.bind(this)}
              dragEnd={this.dragEnd.bind(this)}
              dragOver={this.dragOver.bind(this)}
              addClassToResource={this.addClassToResource.bind(this)}
              addBackgroundOptionToResource={this.addBackgroundOptionToResource.bind(this)}
              updateText={this.updateText.bind(this)}
              updateSummaryText={this.updateSummaryText.bind(this)}
              updateRichContent={this.updateRichContent.bind(this)}
              updateVideo={this.updateVideo.bind(this)}
              openResourcePanel={this.openResourcePanel.bind(this)}
              addTextArea={this.createNewTextArea.bind(this)}
              addVideo={this.addVideo.bind(this)}
              deleteResource={this.deleteResource.bind(this)}
              addLayoutToResource={this.addLayoutToResource.bind(this)}
            />
          </div>
          <div className="submit-area"><button className="btn btn-primary">Submit</button></div>
        </form>
        <CloudinaryUploader
          cloudName='realarpit'
          uploadPreset='h2sbmprz'
          addImage={this.addImage.bind(this)}
          addImages={this.addImages.bind(this)}
          base={this.props.base}
          slug={this.state.id}
          addgallery={this.state.addgallery}
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
