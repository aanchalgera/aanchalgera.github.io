import React from 'react';
import ReactDOM from 'react-dom';
import ContentList from './ContentList';
import PostTitle from './PostTitle';
import PreviewOnSite from './PreviewOnSite';
import CloudinaryUploader from './CloudinaryUploader';
import axios from 'axios';
import Metadata from './Metadata/Metadata';
import {Link} from 'react-router';
import helpers from '../../utils/generatehash';

class Editor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      maxId: 0,
      value: null,
      isError: false,
      isSubmit: false,
      message: null,
      resourcePanelOpenedBy: null,
      imageFunction: null,
      addImageModule: '',
      addMoreImages: false,
      orderMode: false,
      fields: [],
      meta: null,
      postId: '',
      postHash: '',
      isConnected: true,
    };
  }

  init() {
    this.checkConnectStatus();
    var postname = this.props.routeParams.postname;
    if (undefined != postname) {
      try {
        this.props.base.fetch("posts/" + postname, {
          context: this,
          then(data){
            if (null != data) {
              this.setState({
                id : data.id,
                postId: data.publishData.postId != undefined? data.publishData.postId : '',
                postHash: data.publishData.postHash != undefined? data.publishData.postHash : '',
                fields: data.sections != undefined ? data.sections : [],
                value: data.title,
                maxId: data.maxId,
                status: data.status != undefined ? data.status : '',
                publishData: data.publishData != undefined ? data.publishData : {'publishRegion' : ['ES','US','MX','PE','ROW']},
                meta: data.meta != undefined ? data.meta : {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}}
              });
            }
          }
        });
      } catch (e) {
        Rollbar.critical('Error occured while fetching post data from Firebase', e);
      }
    } else {
      let hashId = helpers.generatePushID();
      this.setState({
        id : hashId,
        meta : {index : '', homepage : {content:''}, sponsor:{name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}}
      }, this.context.router.push('/edit/post/'+hashId));
    }
  }

  componentDidMount() {
    var self = this;
    this.timerId = setInterval(function() {
      self.saveData();
    }, 20000);
    this.init();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  checkConnectStatus() {
    var connectedRef = new Firebase(configParams.firebaseUrl+".info/connected");
    connectedRef.on("value",(snap) => {
      if (snap.val() === true) {
        this.setState({
          isConnected : true
        });
      } else {
        this.setState({
          isConnected : false
        });
      }
    });
  }

  openResourcePanel(imageFunction, currentIndex, addImageModule = '', addMoreImages = false, event) {
    if (undefined != event) {
      event.preventDefault();
    }
    this.setState({
      resourcePanelOpenedBy: currentIndex,
      imageFunction: imageFunction,
      addImageModule : addImageModule,
      addMoreImages: addMoreImages,
    });
    document.getElementById('resourcePanel').style.display = 'block'
    document.getElementById('resourcePanel').classList.add('in')
  }

  getField(currentIndex) {
    var indexes = currentIndex.toString().split("-");
    var original = this.state.fields.splice(indexes[0], 1)[0];
    if (undefined !== indexes[1]) {
      var altered = original.columns[indexes[1]];
    } else {
      var altered = original;
    }
    return {indexes, original, altered};
  }

  addImage(image) {
    var currentIndex = this.state.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      var field = this.getField(currentIndex);
      field.altered.backgroundImage = image.url;
      field.altered.backgroundImageName = image.original_filename;
      field.altered.backgroundImageHeight = image.height;
      this.state.fields.splice(field.indexes[0], 0, field.original);;
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
    } else if (this.state.imageFunction == 'homepage') {
      this.state.meta.homepage.image = {
        url: image.url,
        height: image.height != undefined ? image.height : '',
        width: image.width != undefined ? image.width : '',
        alt: image.alt != undefined ? image.alt : '',
        name : image.original_filename
      };
    }
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId,
      meta: this.state.meta
    }, this.saveData());
    document.getElementById('resourcePanel').style.display = 'none';
  }

  addImageCaption(imageId, caption, currentIndex) {
    var field = this.getField(currentIndex);
    if (field.altered.images != undefined) {
      var imageSet = field.altered.images;
      if (imageSet.length > 0) {
        for (var image of imageSet) {
          if (image.spid == imageId) {
            image.description = caption;
          }
        }
        this.state.fields.splice(field.indexes[0], 0, field.original);
        this.setState({
          fields: this.state.fields
        }, this.saveData());
      }
    } else {
      field.altered.description = caption;
      this.state.fields.splice(field.indexes[0], 0, field.original);
      this.setState({
        fields: this.state.fields
      }, this.saveData());
    }
  }

  addImages(images, moduleType) {
    var addMoreImages = this.state.addMoreImages;
    var currentIndex = this.state.resourcePanelOpenedBy;
    if (!addMoreImages) {
      this.state.maxId++;
      this.state.fields.splice(
        currentIndex,0, {"id": this.state.maxId, "type" : moduleType, images});
    } else {
      var field = this.getField(currentIndex);
      for(var i=0;i < images.length;i++) {
        field.altered.images.push(images[i]);
      }
      this.state.fields.splice(field.indexes[0], 0, field.original);
    }
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId,
      addMoreImages: false,
      addImageModule: ''
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
      align: "",
      layout: "normal"
    });
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    }, this.saveData());
  }

  parentDiv(el) {
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == 'div') {
        return el;
      }
    }
  }

  createNewTextArea(currentIndex, type = 'content') {
    this.state.maxId++;
    var field = {
      id: this.state.maxId,
      type: type,
      text: ""
    };

    if (type == 'summary') {
      field.layout = 'normal';
    }

    this.state.fields.splice(currentIndex,0, field);
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    });
  }

  handleChange (ev) {
    this.setState({
      value: ev.currentTarget.value
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
    this.setState({
      value: title,
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

    var data = {
      "id" : this.state.id,
      "title" : this.state.value,
      "sections" : this.state.fields,
      "maxId" : this.state.maxId,
      "status": this.state.status != undefined ? this.state.status : '',
      "publishData" : this.state.publishData != undefined ? this.state.publishData : {'publishRegion' : ['ES','US','MX','PE','ROW']},
      "meta"  : this.state.meta != undefined ? this.state.meta : {index : '', homepage : {content:''}, sponsor:{name:'',image:'',tracker:''}, css:{skinName:''}, seo:{}}
    };

    if (this.state.postId != undefined) {
      data.publishData.postId = this.state.postId;
      data.publishData.postHash = this.state.postHash;
    }

    var listData = {
      "id" : this.state.id,
      "title" : this.state.value
    };
    self = this;
    this.props.base.post(
      'posts_list/' + this.state.id, {
      data: listData,
      then(data){}
    });
    try {
      this.props.base.post(
        'posts/' + this.state.id, {
        data: data,
        then() {
          console.log('autosaved');
          var successField = document.getElementById('successField');
          if (undefined != typeof successField) {
            document.getElementById('successField').style.display = 'block';
            setTimeout(function() {
              document.getElementById('successField').style.display = 'none';
            }, 4000);
          }
        },
      });
    } catch (e) {
      Rollbar.critical('Error occured on saving data to Firebase', e);
    }
  }

  setMessage(isError = false, message) {
    this.setState({
      isError: isError,
      message: message
    });
  }

  addBackgroundOptionToResource(property, value, event) {
     event.preventDefault();
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var field = this.getField(currentIndex);
     switch (property) {
       case 'backgroundClass' :
         field.altered.backgroundClass = (field.altered.backgroundClass == value) ? '' : value;
         break;
       case 'foregroundColor' :
         field.altered.foregroundColor = (field.altered.foregroundColor == value) ? '' : value;
         break;
       case 'parallax' :
          field.altered.parallax = !field.altered.parallax;
          event.target.className = "active";
          break;
        case 'backgroundRepeat' :
          field.altered.backgroundRepeat = !field.altered.backgroundRepeat;
          break;
        case 'backgroundFade' :
          field.altered.backgroundFade = !field.altered.backgroundFade;
          break;
        case 'removeBackgroundImage' :
          field.altered.backgroundImage = '';
          field.altered.backgroundFade = '';
          field.altered.backgroundRepeat = '';
          field.altered.backgroundFullscreen = '';
          break;
        case 'backgroundFullscreen' :
          field.altered.backgroundFullscreen = !field.altered.backgroundFullscreen;
          break;
       }
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  deleteResource(event) {
    var confirmation = confirm("Are you sure you want to delete this?");
    if (confirmation == true) {
      var currentIndex = this.parentDiv(event.target).dataset.id;
      this.state.fields.splice(currentIndex, 1);
      this.setState({fields: this.state.fields}, this.saveData());
    }
  }

  groupSections(currentIndex, group, event) {
     this.state.maxId++;
     var objects = this.state.fields.splice(currentIndex, group);
     for (var object of objects) {
       if (object.type == 'image' || object.type == 'video' || object.type == 'gallery' || object.type == 'slider') {
         object.backgroundFade = '';
         object.backgroundClass = '';
         object.backgroundImage = '';
       }
     }
     this.state.fields.splice(currentIndex, 0, {
       id : this.state.maxId,
       type : 'grouped',
       length : group,
       columns: objects
     });
     this.setState({fields: this.state.fields}, this.saveData());
  }

  ungroupSections(currentIndex, event) {
     var obj = this.state.fields.splice(currentIndex, 1)[0];
     if (obj.length == 2 ){
       this.state.fields.splice(currentIndex, 0, obj.columns[0], obj.columns[1]);
     }else if (obj.length == 3) {
       this.state.fields.splice(currentIndex, 0, obj.columns[0], obj.columns[1], obj.columns[2]);
     }
     this.setState({fields: this.state.fields}, this.saveData());
  }

  updateText(event, value) {
     var ta = event.getTextArea();
     var currentIndex = ta.dataset.id;
     var field = this.getField(currentIndex);
     field.altered.text = value;
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  updateSummaryText(currentIndex, event)
  {
     var field = this.getField(currentIndex);
     field.altered.text = event.target.innerHTML;
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  updateRichContent(currentIndex, event) {
     var field = this.getField(currentIndex);
     field.altered.text = event.target.textContent;
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  updateVideo(currentIndex, event) {
     var field = this.getField(currentIndex);
     field.altered.url = event.target.value;
     this.state.fields.splice(field.indexes[0], 0, field.original);
     this.setState({fields: this.state.fields}, this.saveData());
  }

  addLayoutToResource(event) {
     event.preventDefault();
     var currentIndex = this.parentDiv(event.target).dataset.id;
     var value = event.target.dataset.layout;
     var field = this.getField(currentIndex);
     field.altered.layout = value;
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  moveResourceDown(currentIndex) {
    var obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex+1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  moveResourceUp(currentIndex, event)
  {
    var obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex-1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  toggleOrderMode(event) {
    event.preventDefault();
    this.setState({orderMode:!this.state.orderMode})
  }

  setAutoPlaySlider(event, value) {
     event.preventDefault();
     var currentIndex = event.currentTarget.dataset.id;
     var field = this.getField(currentIndex);
     field.altered.autoplay = value;
     this.state.fields.splice(field.indexes[0], 0, field.original);;
     this.setState({fields: this.state.fields}, this.saveData());
  }

  updateIndexMetadata(event) {
    this.state.meta.index= event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateFooterCredits(event) {
    this.state.meta.footer = event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateHomepageContent(value) {
    this.state.meta.homepage.content = value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateSponsorName(event) {
    this.state.meta.sponsor.name = event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  deleteHomepageImage() {
    this.state.meta.homepage.image = null;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateSeoTitle(event) {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.title = event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateSeoDescription(event) {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.description = event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateSponsorImage(value) {
    this.state.meta.sponsor.image = value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateSponsorTracker(event) {
    this.state.meta.sponsor.tracker = event.target.value;
    this.setState({meta: this.state.meta}, this.saveData());
  }

  updateCssSkinName(event) {
    this.state.meta.css.skinName = event.target.value.trim();
    this.setState({meta: this.state.meta}, this.saveData());
  }

  savePreviewData(id, postHash) {
    this.setState({
      postId: id,
      postHash: postHash
    }, this.saveData());
  }

  render() {
    var errorField = '';
    if (this.state.isError) {
      errorField = <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error:</span>{this.state.message}</div>;
    }
    var successField = <div id="successField" className="alert alert-info auto-saved" style={{display : "none"}}>
          <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>
          <strong>  Post saved </strong>
        </div>;
    var connectStatus = <div className={this.state.isConnected ? "status status-on" :"status status-off"}></div>;
    var metadata = <Metadata
      meta={this.state.meta}
      updateIndexMetadata={this.updateIndexMetadata.bind(this)}
      updateSeoTitle={this.updateSeoTitle.bind(this)}
      updateSeoDescription={this.updateSeoDescription.bind(this)}
      updateFooterCredits={this.updateFooterCredits.bind(this)}
      updateHomepageContent={this.updateHomepageContent.bind(this)}
      updateSponsorName={this.updateSponsorName.bind(this)}
      updateSponsorImage={this.updateSponsorImage.bind(this)}
      updateSponsorTracker={this.updateSponsorTracker.bind(this)}
      updateCssSkinName={this.updateCssSkinName.bind(this)}
      deleteHomepageImage={this.deleteHomepageImage.bind(this)}
      openResourcePanel={this.openResourcePanel.bind(this)}
    />
    return (
      <div className={this.state.orderMode ? 'bgbody' : '' }>
        <div className="preview-nav">
          <a title="Order Elements" onClick={this.toggleOrderMode.bind(this)} href="#" className="glyphicon glyphicon-move js-minimise"><span>Order Elements</span></a>
          <PreviewOnSite postId={this.state.id} savePreviewData={this.savePreviewData.bind(this)} />
          <Link className="btn btn-primary" to="/">List Page</Link>
          <Link className="btn btn-primary" to={"/publish/"+this.state.id}>Go to Publish</Link>
          <Link className="btn btn-primary" to={"/config"}>Go to Config</Link>
          <Link className="btn btn-primary" to={"/config/new"}>Add Config</Link>
        </div>
        {connectStatus}
        {errorField}
        {successField}
        <form id="editor-form">
          <div className="form-group">
            <label className="col-sm-12 control-label">Title</label>
            <PostTitle value={this.state.value} handleChange={this.handleChange.bind(this)} handleBlur={this.handleBlur.bind(this)}/>
            <ContentList
              fields={this.state.fields}
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
              groupSections={this.groupSections.bind(this)}
              ungroupSections={this.ungroupSections.bind(this)}
              moveResourceDown={this.moveResourceDown.bind(this)}
              moveResourceUp={this.moveResourceUp.bind(this)}
              orderMode={this.state.orderMode}
              addImageCaption={this.addImageCaption.bind(this)}
              setAutoPlaySlider={this.setAutoPlaySlider.bind(this)}
            />
          </div>
        </form>
        {this.state.meta ? metadata: ''}
        <CloudinaryUploader
          cloudName={configParams.cloudName}
          uploadPreset={configParams.uploadPreset}
          addImage={this.addImage.bind(this)}
          addImages={this.addImages.bind(this)}
          base={this.props.base}
          slug={this.state.id}
          addImageModule={this.state.addImageModule}
          ref="resourcePanel"
        />
        <div id="preview"></div>
      </div>
    )
  }
};

Editor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Editor;
