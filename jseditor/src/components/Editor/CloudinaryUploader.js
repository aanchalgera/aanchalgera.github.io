/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import ResourcePanel from './ResourcePanel';

class CloudinaryUploader extends React.Component {
  static propTypes = {
    cloudName: PropTypes.string.isRequired,
    uploadPreset: PropTypes.string.isRequired,
    showPoweredBy: PropTypes.bool,
    allowedFormats: PropTypes.array,
    maxFileSize: PropTypes.number,
    maxImageWidth: PropTypes.number,
    maxImageHeight: PropTypes.number,
    sources: PropTypes.arrayOf(PropTypes.string),
    defaultSource: PropTypes.string,
    multiple: PropTypes.bool,
    maxFiles: PropTypes.number,
    cropping: PropTypes.string,
    croppingAspectRatio: PropTypes.number,
    publicId: PropTypes.string,
    folder: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    resourceType: PropTypes.string,
    contextAlt: PropTypes.string,
    contextCaption: PropTypes.string,
    buttonClass: PropTypes.string,
    buttonCaption: PropTypes.string
  };

  static defaultProps = {
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
    resourceType: 'image',
    contextAlt: null,
    contextCaption: null,
    allowedFormats: ['png', 'gif', 'jpeg'],
    maxFileSize: 8000000,
    maxImageWidth: null,
    maxImageHeight: null,
    buttonClass: 'btn btn-primary',
    buttonCaption: 'Upload Images'
  };

  constructor(props, context) {
    super(props, context);
    var initialState = {
      cloudName: props.cloudName,
      uploadPreset: props.uploadPreset,
      showPoweredBy: false,
      allowedFormats: null,
      uuid: this.uuid(),
      imageList: []
    };
    this.state = initialState;
  }

  init = () => {
    if (this.props.slug != undefined && this.props.slug != '') {
      try {
        this.props.base.fetch('images/' + this.props.slug, {
          context: this,
          asArray: true,
          then(data) {
            if (null != data) {
              this.setState({
                imageList: data
              });
            }
          }
        });
      } catch (e) {
        //  Rollbar.critical('Error while fetching image data from firebase', e);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    this.init();
    if (
      nextProps.isCloudinaryUploaderOpen !==
        this.props.isCloudinaryUploaderOpen &&
      nextProps.isCloudinaryUploaderOpen === true
    ) {
      this.openUploader();
    }
  }

  componentDidMount() {
    this.init();
  }

  uuid = () => {
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
      );
    }
    return guid();
  };

  getUploadOptions = () => {
    var options = {
      cloud_name: this.state.cloudName,
      upload_preset: this.state.uploadPreset
    };
    options.sources = this.props.sources;
    options.multiple = this.props.multiple;
    options.max_file_size = this.props.maxFileSize;

    if (this.props.maxFiles) {
      options.max_files = this.props.maxFiles;
    }

    if (this.props.cropping && this.props.cropping === 'server') {
      options.cropping = this.props.cropping;
    }

    if (this.croppingAspectRatio) {
      options.cropping_aspect_ratio = this.props.croppingAspectRatio;
    }

    if (this.props.publicId) {
      options.public_id = this.props.public_id;
    }

    if (this.props.folder) {
      options.folder = this.props.folder;
    }

    if (this.props.tags && this.props.tags.length > 0) {
      options.tags = this.props.tags;
    }

    if (this.props.resourceType) {
      options.resource_type = this.props.resourceType;
    }

    if (this.props.allowedFormats) {
      options.client_allowed_formats = this.props.allowedFormats;
    }

    var context = {};
    if (this.props.contextAlt) {
      context.alt = this.props.contextAlt;
    }

    if (this.props.contextCaption) {
      context.caption = this.props.contextCaption;
    }

    if (Object.keys(context).length > 0) {
      options.context = context;
    }

    return options;
  };

  openResourcePanel = () => {
    this.refs.resourcePanel.getStyle().style.display = 'block';
    this.refs.resourcePanel.getStyle().classList.add('in');
  };

  openUploader = ev => {
    if (ev) {
      ev.preventDefault();
    }

    var self = this;
    try {
      var options = this.getUploadOptions();
      window.cloudinary.openUploadWidget(options, function(error, result) {
        self.props.toggleCloudinaryUploader();
        if (error || !result || result.length === 0) {
          return;
        }
        self.props.base.post('images/' + self.props.slug, {
          data: self.state.imageList.concat(result),
          then() {
            self.init();
            self.openResourcePanel();
          }
        });
        return true;
      });
    } catch (e) {
      //  Rollbar.error('Error occured while uploading image to cloudinary', e);
    }
  };

  render() {
    return (
      <ResourcePanel
        addImage={this.props.addImage}
        addImages={this.props.addImages}
        editImages={this.props.editImages.bind(this)}
        base={this.props.base}
        images={this.state.imageList}
        slug={this.props.slug}
        handleClick={this.props.toggleCloudinaryUploader}
        addImageModule={this.props.addImageModule}
        imageFunction={this.props.imageFunction}
        ref="resourcePanel"
      />
    );
  }
}

export default CloudinaryUploader;
