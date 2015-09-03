import React from 'react';
import Thumbnail from './Thumbnail';
import ResourcePanel from './ResourcePanel';

var CloudinaryUploader = React.createClass({
  propTypes:{
    cloudName: React.PropTypes.string.isRequired,
    uploadPreset: React.PropTypes.string.isRequired,
    showPoweredBy: React.PropTypes.bool,
    allowedFormats: React.PropTypes.array,
    maxFileSize: React.PropTypes.number,
    maxImageWidth: React.PropTypes.number,
    maxImageHeight: React.PropTypes.number,
    sources: React.PropTypes.arrayOf(React.PropTypes.string),
    defaultSource: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    maxFiles: React.PropTypes.number,
    cropping: React.PropTypes.string,
    croppingAspectRatio: React.PropTypes.number,
    publicId: React.PropTypes.string,
    folder: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    resourceType: React.PropTypes.string,
    contextAlt: React.PropTypes.string,
    contextCaption: React.PropTypes.string,
    buttonClass: React.PropTypes.string,
    buttonCaption: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      showPoweredBy: false,
      sources: ['local'],
      defaultSource: 'local',
      multiple: true,
      maxFiles: null,
      cropping: null,
      croppingAspectRation: null,
      publicId: null,
      folder: null,
      tags: ['arpit'],
      resourceType: 'auto',
      contextAlt: null,
      contextCaption: null,
      allowedFormats: ['png', 'gif', 'jpeg'],
      maxFileSize: null,
      maxImageWidth: null,
      maxImageHeight: null,
      buttonClass: 'btn btn-primary',
      buttonCaption: 'Upload Images'
    }
  },
  getInitialState: function(){
    var initialState =  {
      cloudName: this.props.cloudName,
      uploadPreset: this.props.uploadPreset,
      images : [],
      isError: false,
      errorMessage: null,
      showPoweredBy: false,
      allowedFormats: null,
      uuid: this.uuid()
    };
    return initialState;
  },
  uuid: function(){
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
    return guid();
  },
  getUploadOptions: function(){
    var options = {
      cloud_name: this.state.cloudName,
      upload_preset: this.state.uploadPreset
    };
    options.sources = this.props.sources;
    options.multiple = this.props.multiple;

    if(this.props.maxFiles){
      options.max_files = this.props.maxFiles
    }

    if(this.props.cropping && this.props.cropping === 'server'){
      options.cropping = this.props.cropping;
    }

    if(this.croppingAspectRatio){
      options.cropping_aspect_ratio = this.props.croppingAspectRatio;
    }

    if(this.props.publicId){
      options.public_id = this.props.public_id;
    }

    if(this.props.folder){
      options.folder = this.props.folder;
    }

    if(this.props.tags && this.props.tags.length > 0){
      options.tags = this.props.tags;
    }

    if(this.props.resourceType){
      options.resource_type = this.props.resourceType;
    }

    if(this.props.allowedFormats){
      options.client_allowed_formats = this.props.allowedFormats
    }

    var context = {};
    if(this.props.contextAlt){
      context.alt = this.props.contextAlt;
    }

    if(this.props.contextCaption){
      context.caption = this.props.contextCaption;
    }

    if(Object.keys(context).length > 0){
      options.context = context;
    }

    return options;
  },
  setError: function(isError, errorMessage){
    this.setState({
      isError: true,
      errorMessage: errorMessage
    });
  },
  openResourcePanel: function () {
    document.getElementById('resourcePanel').style.display = 'block'
    document.getElementById('resourcePanel').classList.add('in')
  },
  handleClick: function(ev){
    var self = this;
    try{
      var options = this.getUploadOptions();
      cloudinary.openUploadWidget(
        options,
        function(error, result) {
          if (error){
            self.setError(true, error)
            ev.preventDefault();
          }
          if (!result || result.length === 0){
            self.setError(true, 'No result from Cloudinary');
            ev.preventDefault();
          }
          self.setState({images : result});
          self.openResourcePanel();
          return true;
        }
      );
    }catch(e){
      self.setError(true, e);
      ev.preventDefault();
    }
  },
  render: function(){
    var uploader_id = "uploader_" + this.state.uuid;
    var style = {position:'fixed', top:0, right:'20px', zIndex:2000};
    return (
      <div>
        <div className="nav-btns-top" style={style}>
          <button
            ref='uploader'
            id={uploader_id}
            className={this.props.buttonClass}
            onClick={this.handleClick}>{this.props.buttonCaption}</button>
          <p>{this.state.errorMessage}</p>
        </div>
        <ResourcePanel
        data={this.state.images.length ? this.state.images : []}
        addImage={this.props.addImage}
        />
      </div>
    );
  }
});


export default CloudinaryUploader;
