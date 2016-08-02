import React from 'react';
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
      sources: ['local', 'url'],
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
      allowedFormats: ['png', 'gif', 'jpeg', 'mp4'],
      maxFileSize: null,
      maxImageWidth: null,
      maxImageHeight: null,
      buttonClass: 'btn btn-primary',
      buttonCaption: 'Upload Images'
    };
  },
  getInitialState: function(){
    var initialState =  {
      cloudName: this.props.cloudName,
      uploadPreset: this.props.uploadPreset,
      isError: false,
      errorMessage: null,
      showPoweredBy: false,
      allowedFormats: null,
      uuid: this.uuid(),
      imageList: []
    };
    return initialState;
  },
  init: function(){
    if (this.props.slug != undefined && this.props.slug != '') {
      try {
        this.props.base.fetch('images/' + this.props.slug, {
          context: this,
          asArray: true,
          then(data){
            if (null != data) {
              this.setState({
                imageList : data
              });
            }
          }
        });
      } catch (e) {
        Rollbar.critical('Error while fetching image data from firebase', e);
      }
    }
  },
  componentWillReceiveProps: function() {
    this.init();
  },
  componentDidMount: function(){
    this.init();
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
      options.max_files = this.props.maxFiles;
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
      options.client_allowed_formats = this.props.allowedFormats;
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
    this.refs.resourcePanel.getStyle().style.display = 'block';
    this.refs.resourcePanel.getStyle().classList.add('in');
  },
  handleClick: function(ev){
    if(this.props.slug == undefined || this.props.slug == '') {
      this.setError(true, 'Title not set');
      ev.preventDefault();
    }
    var self = this;
    try{
      var options = this.getUploadOptions();
      if (this.props.addImageModule == 'homepage') {
        options.client_allowed_formats.splice(
          options.client_allowed_formats.indexOf('mp4'), 1
        );
      }
      cloudinary.openUploadWidget(
        options,
        function(error, result) {
          if (error){
            self.setError(true, error);
            ev.preventDefault();
          }
          if (!result || result.length === 0){
            self.setError(true, 'No result from Cloudinary');
            ev.preventDefault();
          }
          self.props.base.post('images/' + self.props.slug, {
            data: self.state.imageList.concat(result),
            then(){
              self.init();
              self.openResourcePanel();
            }
          });
          return true;
        }
      );
    }catch(e){
      Rollbar.error('Error occured while uploading image to cloudinary', e);
      self.setError(true, e);
      ev.preventDefault();
    }
  },
  render: function(){
    var uploader_id = 'uploader_' + this.state.uuid;
    return (
      <div>
        <div className="nav-btns-top">
          <button
            ref='uploader'
            id={uploader_id}
            disabled={!this.props.slug}
            className={this.props.buttonClass}
            onClick={this.handleClick}>{this.props.buttonCaption}</button>
        </div>
        <ResourcePanel
          addImage={this.props.addImage}
          addImages={this.props.addImages.bind(this)}
          base={this.props.base}
          images={this.state.imageList}
          uploaderId={uploader_id}
          slug={this.props.slug}
          handleClick={this.handleClick}
          addImageModule={this.props.addImageModule}
          ref="resourcePanel"
        />
      </div>
    );
  }
});

export default CloudinaryUploader;
