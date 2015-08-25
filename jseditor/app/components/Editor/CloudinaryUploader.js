import React from 'react';
import Thumbnail from './Thumbnail';

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
      allowedFormats: ['png', 'gif', 'jpeg'],
      maxFileSize: null,
      maxImageWidth: null,
      maxImageHeight: null,
      buttonClass: 'cloudinary-button',
      buttonCaption: 'Upload image'
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
      options.resourceType = this.props.resourceType;
    }

    if(this.props.allowedFormats){
      options.allowedFormats = this.props.allowedFormats
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
  handleClick: function(ev){
    var self = this;
    try{
      var options = this.getUploadOptions();
      cloudinary.openUploadWidget(
        options,
        function(error, result) {
          if (error){
            self.setError(true, error)
            return false;
          }
          if (!result || result.length === 0){
            self.setError(true, 'No result from Cloudinary');
            return false;
          }
          self.setState({images : result});
          return true;
        }
      );
    }catch(e){
      self.setError(true, e);
      return false;
    }
  },
  render: function(){
    var uploader_id = "uploader_" + this.state.uuid;
    var images = [];
    if (this.state.images.length != 0) {
      var images = this.state.images.map((data, i) => {
        return (
          <Thumbnail
            key={data.public_id}
            data={data}
            dragImageStart={this.props.dragImageStart.bind(this)}
            dragImageEnd={this.props.dragImageEnd.bind(this)}
          />
        )
      });
    }
    return (
      <section>
        <p><img alt="upload image" src="./upload_thumb.png" draggable="false" /></p>
        <ul className="resources-area list-inline">{images}</ul>
        <a
          ref='uploader'
          id={uploader_id}
          href="#"
          className={this.props.buttonClass}
          onClick={this.handleClick}>{this.props.buttonCaption}</a>
        <p>{this.state.errorMessage}</p>
      </section>
    );
  }
});


export default CloudinaryUploader;
