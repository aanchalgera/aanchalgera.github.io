import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import ContentList from './ContentList';
import PostTitle from './PostTitle';
import PreviewOnSite from './PreviewOnSite';
import CloudinaryUploader from './CloudinaryUploader';
import Metadata from './Metadata/Metadata';
import { Link } from 'react-router';
import helpers from '../../utils/generatehash';

moment.tz.setDefault(configParams.timezone);
const TITLE_MINLENGTH_WARNING = 'The title should be more than 5 characters';
const TITLE_MAXLENGTH_WARNING = 'The title can be 130 characters long';
const CONTENT_EMPTY_WARNING = 'Add some content to save the post';
const DELETE_SECTION_WARNING = 'Are you sure you want to delete this?';
const BLOG_EMPTY_WARNING = 'Blog not found';
const BLOG_MISMATCH_WARNING = 'Post does not belongs to this blog';
const CAPTION_WARNING = 'Anchor tag is not allowed in image captions';
const FIELD_EMPTY_WARNING = 'One of the added fields should contain some value';
const MAIN_IMAGE_WARNING = 'Add homepage image to publish this post';

class Editor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      maxId: 0,
      value: '',
      isError: false,
      isSubmit: false,
      message: '',
      resourcePanelOpenedBy: '',
      imageFunction: '',
      addImageModule: '',
      addMoreImages: false,
      orderMode: false,
      fields: [],
      meta: null,
      regions: {
        publishRegion: ['ES', 'US', 'MX', 'PE', 'AR', 'CL', 'EC', 'CR', 'CO', 'CEA', 'ROW']
      },
      postId: '',
      postHash: '',
      isConnected: true,
      status: 'draft',
      buttonDisabled: false,
      isSynced: false
    };
  }

  init() {
    this.checkConnectStatus();
    let postname = this.props.params.postname;
    let { query } = this.props.location;
    this.blogName = query.blog;
    this.userId = query.userid;
    if (this.blogName == undefined) {
      this.context.router.replace('/invalidBlog');
    } else {
      this.props.base.fetch('config', {
        context: this,
        asArray: true,
        queries: {
          orderByChild: 'site_name',
          equalTo: this.blogName
        },
        then(data) {
          if (data[0] != null) {
            this.setState({
              blogName: this.blogName,
              blogUrl: data[0].site_url
            });
          } else {
            this.context.router.replace('/invalidBlog');
          }
        }
      });
    }
    let regEx = /\D/;
    if (regEx.test(this.userId)) {
      this.context.router.replace('/invalidUser');
    } else if (undefined != postname) {
      try {
        this.props.base.fetch('posts/' + postname, {
          context: this,
          then(data) {
            if (null != data) {
              this.setState({
                id: data.id,
                userId: data.user_id,
                postId: data.publishData.postId || '',
                postHash: data.publishData.postHash || '',
                fields: data.sections || [],
                value: data.title,
                maxId: data.maxId,
                status: data.status || this.state.status,
                publishData: data.publishData || this.state.regions,
                meta: data.meta || {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}, microsite: {name:'', gaSnippet: '', showWSLLogo: true, showSocialButtons: true}, author: {showAuthorInfo: false}},
                isSynced: true
              });
            } else {
              this.setState({
                id: postname,
                meta : {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}, microsite: {name:'', gaSnippet: '', showWSLLogo: true, showSocialButtons: true}, author: {showAuthorInfo: false}},
                userId: this.userId
              });
            }
          }
        });
      } catch (e) {
        Rollbar.critical('Error occured while fetching post data from Firebase', e);
      }
    } else {
      let hashId = helpers.generatePushID();
      let postEditUrl = '/edit/post/' + hashId + '?blog=' + this.blogName + '&userid=' + this.userId;
      this.setState({
        id: hashId,
        meta : {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}, microsite: {name:'', gaSnippet: '', showWSLLogo: true, showSocialButtons: true}, author: {showAuthorInfo: false}},
        userId: this.userId
      }, this.context.router.push(postEditUrl));
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.saveData(), 20000);
    this.init();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  checkConnectStatus() {
    let connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        this.setState({
          isConnected: true
        });
      } else {
        this.setState({
          isConnected: false
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
      addImageModule: addImageModule,
      addMoreImages: addMoreImages
    });
    document.getElementById('resourcePanel').style.display = 'block';
    document.getElementById('resourcePanel').classList.add('in');
  }

  getField(currentIndex) {
    let indexes = currentIndex.toString().split('-');
    let original = this.state.fields.splice(indexes[0], 1)[0];
    let altered = original;
    if (undefined != indexes[1]) {
      altered = original.columns[indexes[1]];
    }

    return { indexes, original, altered };
  }

  addResource({type,currentIndex}) {
    switch (type) {
      case 'GIF':
        this.addGiphy(currentIndex);
        break;
    }
  }

  addImage(image) {
    let currentIndex = this.state.resourcePanelOpenedBy;
    if (this.state.imageFunction == 'backgroundImage') {
      let field = this.getField(currentIndex);
      field.altered.backgroundImage = image.url;
      field.altered.backgroundImageName = image.original_filename;
      field.altered.backgroundImageHeight = image.height;
      this.state.fields.splice(field.indexes[0], 0, field.original);
    } else if (this.state.imageFunction == 'image') {
      this.state.maxId++;
      this.state.fields.splice(
      currentIndex, 0, {
        id: this.state.maxId,
        type: 'image',
        url: image.url,
        height: image.height || '',
        width: image.width || '',
        alt: image.alt || '',
        banner: false,
        parallax: false,
        align: '',
        layout: 'normal'
      });
    } else if (this.state.imageFunction == 'homepage') {
      this.state.meta.homepage.image = {
        url: image.url,
        height: image.height || '',
        width: image.width || '',
        alt: image.alt || '',
        name: image.original_filename
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
    let field = this.getField(currentIndex);
    if (field.altered.images != undefined) {
      let imageSet = field.altered.images;
      if (imageSet.length > 0) {
        for (let image of imageSet) {
          if (image.spid == imageId) {
            image.description = caption.trim();
          }
        }

        this.state.fields.splice(field.indexes[0], 0, field.original);
        this.setState({
          fields: this.state.fields
        }, this.saveData());
      }
    } else {
      field.altered.description = caption.trim();
      this.state.fields.splice(field.indexes[0], 0, field.original);
      this.setState({
        fields: this.state.fields
      }, this.saveData());
    }
  }

  addImageCaptionOverlay(imageId, captionOverlay, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionOverlay = captionOverlay;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({
      fields: this.state.fields
    }, this.saveData());
  }

  addImageCaptionOverlayPosition(imageId, captionPosition, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionPosition = captionPosition;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({
      fields: this.state.fields
    }, this.saveData());
  }

  addImageCaptionOverlayBackground(imageId, captionBackground, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionBackground = captionBackground;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({
      fields: this.state.fields
    }, this.saveData());
  }

  addImages(images, moduleType) {
    let addMoreImages = this.state.addMoreImages;
    let currentIndex = this.state.resourcePanelOpenedBy;
    if (!addMoreImages) {
      this.state.maxId++;
      this.state.fields.splice(
        currentIndex, 0, { id: this.state.maxId, type: moduleType, layout: 'normal', images }
      );
    } else {
      let field = this.getField(currentIndex);
      for (let i = 0; i < images.length; i++) {
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

  editImages(images) {
    const { resourcePanelOpenedBy } = this.state;
    let currentIndex = resourcePanelOpenedBy.currentIndex;
    let imageIndex = resourcePanelOpenedBy.imageIndex;

    let field = this.getField(currentIndex);
    field.altered.images.splice(imageIndex, 1, ...images);
    this.state.fields.splice(field.indexes[0], 0, field.original);

    this.setState({
      fields: this.state.fields,
      addMoreImages: false,
      addImageModule: ''
    }, this.saveData());
  }

  addVideo(currentIndex) {
    this.state.maxId++;
    this.state.fields.splice(
    currentIndex, 0, {
      id: this.state.maxId,
      type: 'video',
      url: '',
      align: '',
      layout: 'normal'
    });
    this.setState({
      fields: this.state.fields,
      maxId: this.state.maxId
    }, this.saveData());
  }

  addGiphy(currentIndex) {
    this.state.maxId++;
    this.state.fields.splice(
    currentIndex, 0, {
      id: this.state.maxId,
      giphyId:'',
      type: 'GIF',
      url: '',
      align: '',
      layout: 'normal'
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
    let field = {
      id: this.state.maxId,
      type: type,
      text: ''
    };

    if (type == 'summary') {
      field.layout = 'normal';
    }

    this.state.fields.splice(currentIndex, 0, field);
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
    let title = ev.currentTarget.value.trim();
    if (undefined == title || '' == title) {
      this.setMessage(true, TITLE_MINLENGTH_WARNING);
      return;
    } else {
      this.setMessage(false);
    }

    this.setState({
      value: title
    }, this.saveData());
  }

  isValid() {
    if (undefined == this.state.blogName) {
      this.setMessage(true, BLOG_EMPTY_WARNING);
      return false;
    }

    if (this.blogName != this.state.blogName) {
      this.setMessage(true, BLOG_MISMATCH_WARNING);
      return false;
    }

    if (undefined == this.state.value ||
      '' == this.state.value.trim() ||
      5 >= this.state.value.length
    ) {
      this.setMessage(true, TITLE_MINLENGTH_WARNING);
      return false;
    }

    if (130 <= this.state.value.length) {
      this.setMessage(true, TITLE_MAXLENGTH_WARNING);
      return false;
    }

    if (this.state.fields.length < 2) {
      this.setMessage(true, CONTENT_EMPTY_WARNING);
      return false;
    }

    if (!this.isValidFieldCaptions(this.state.fields)) {
      this.setMessage(true, CAPTION_WARNING);
      return false;
    }

    this.setMessage(false);
    return true;
  }

  isValidFieldCaptions(fields) {
    let validCaptions = true;
    fields.forEach(field => {
      switch(field.type) {
        case 'grouped':
          if (!this.isValidFieldCaptions(field.columns)) {
            validCaptions = false;
          }
          break;

        case 'gallery':
        case 'slider':
          field.images.forEach(({ description }) => {
            if (description && !this.isValidCaption(description)) {
              validCaptions = false;
            }
          });
          break;
      }
    });

    return validCaptions;
  }

  isValidCaption(caption) {
    return !/\<(?=(a[\s\>]))[\w\d]+[^\>]*\>/.test(caption);
  }

  saveData () {
    if (!this.isValid()) {
      return;
    }

    let userStatus = this.blogName + '_' + this.state.userId + '_' + this.state.status;
    let data = {
      id: this.state.id,
      user_id: this.state.userId,
      user_status: userStatus,
      blog_status: this.blogName + '_' + this.state.status,
      blogName: this.state.blogName,
      title: this.state.value,
      sections: this.state.fields,
      maxId: this.state.maxId,
      status: this.state.status || '',
      publishData: this.state.publishData || this.state.regions,
      meta: this.state.meta != undefined ? this.state.meta : {index : '', homepage : {content:''}, sponsor: {name:'', image:'',tracker:''}, css:{skinName:''}, seo:{}, microsite: {name:'', gaSnippet: '', showWSLLogo: true, showSocialButtons: true}, author: {showAuthorInfo: false}}
    };

    if (this.state.postId != undefined && this.state.postId != '') {
      data.publishData.postId = this.state.postId;
      data.publishData.postHash = this.state.postHash;
    }

    let listData = {
      id: this.state.id,
      title: this.state.value,
      status: this.state.status,
      user_id: this.state.userId,
      user_status: userStatus,
      blog_status: this.blogName + '_' + this.state.status,
      blog_name: this.state.blogName
    };
    this.props.base.post(
      'posts_list/' + this.state.id,
      {
        data: listData,
        then() {}
      }
    );
    try {
      const _this = this;
      this.props.base.post(
        'posts/' + this.state.id,
        {
          data: data,
          then() {
            let successField = document.getElementById('successField');
            if (undefined != typeof successField) {
              document.getElementById('successField').style.display = 'block';
              setTimeout(() => document.getElementById('successField').style.display = 'none', 4000);
            }
            _this.setState({isSynced: true});
          }
        }
      );
    } catch (e) {
      Rollbar.critical('Error occured on saving data to Firebase', e);
      let errorMessage = e.message.substring(0, 100);
      this.setMessage(true, errorMessage);
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
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let field = this.getField(currentIndex);
    switch (property) {
      case 'backgroundClass' :
        field.altered.backgroundClass = (field.altered.backgroundClass == value) ? '' : value;
        break;
      case 'foregroundColor' :
        field.altered.foregroundColor = (field.altered.foregroundColor == value) ? '' : value;
        break;
      case 'parallax' :
        field.altered.parallax = !field.altered.parallax;
        event.target.className = 'active';
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
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  deleteResource(event) {
    event.preventDefault();
    if (confirm(DELETE_SECTION_WARNING)) {
      let currentIndex = this.parentDiv(event.target).dataset.id;
      this.state.fields.splice(currentIndex, 1);
      this.setState({ fields: this.state.fields }, this.saveData());
    }
  }

  groupSections(currentIndex, group) {
    this.state.maxId++;
    let objects = this.state.fields.splice(currentIndex, group);
    for (let object of objects) {
      if (object.type == 'image' || object.type == 'video' || object.type == 'gallery' || object.type == 'slider') {
        object.backgroundFade = '';
        object.backgroundClass = '';
        object.backgroundImage = '';
      }
    }

    this.state.fields.splice(currentIndex, 0, {
      id: this.state.maxId,
      type: 'grouped',
      length: group,
      columns: objects
    });
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  ungroupSections(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1)[0];
    if (obj.length == 2) {
      this.state.fields.splice(currentIndex, 0, obj.columns[0], obj.columns[1]);
    } else if (obj.length == 3) {
      this.state.fields.splice(currentIndex, 0, obj.columns[0], obj.columns[1], obj.columns[2]);
    }

    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateText(currentIndex, value) {
    let field = this.getField(currentIndex);
    field.altered.text = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateRichContent(currentIndex, event) {
    let field = this.getField(currentIndex);
    field.altered.text = event.target.textContent;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateVideo(currentIndex, event) {
    let field = this.getField(currentIndex);
    field.altered.url = event.target.value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateGiphy(currentIndex, event) {
    let field = this.getField(currentIndex);
    let url = event.target.value;
    let giphyId = url.split('-').splice(-1)[0];
    field.altered.url = url;
    field.altered.giphyId = giphyId;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  addLayoutToResource(event) {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let value = event.target.dataset.layout;
    let field = this.getField(currentIndex);
    field.altered.layout = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  moveResourceDown(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex + 1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  moveResourceUp(currentIndex) {
    let obj = this.state.fields.splice(currentIndex, 1);
    this.state.fields.splice(currentIndex - 1, 0, obj[0]);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  toggleOrderMode(event) {
    event.preventDefault();
    this.setState({ orderMode: !this.state.orderMode });
  }

  setAutoPlaySlider(event, value) {
    event.preventDefault();
    let currentIndex = event.currentTarget.dataset.id;
    let field = this.getField(currentIndex);
    field.altered.autoplay = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateIndexMetadata(event) {
    this.state.meta.index = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateFooterCredits(event) {
    this.state.meta.footer = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateHomepageContent(value) {
    this.state.meta.homepage.content = value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSponsorName(event) {
    this.state.meta.sponsor.name = event.target.value.trim();
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeName(event) {
    this.state.meta.microsite.name = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeGASnippet(event) {
    this.state.meta.microsite.gaSnippet = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateMicrositeCookiePage(event) {
    this.state.meta.microsite.cookiePage = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleSocialSharing(event) {
    this.state.meta.microsite.showSocialButtons = event.target.checked;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleWSLLogo(event) {
    this.state.meta.microsite.showWSLLogo = event.target.checked;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleAuthorInfo(event) {
    let author = this.state.meta.author || {};
    author.showAuthorInfo = event.target.checked;
    this.state.meta.author = author;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  editAuthorInfo(id) {
    this.setState({ userId: id }, this.saveData());
  }

  deleteHomepageImage() {
    this.state.meta.homepage.image = null;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSeoTitle(event) {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.title = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSeoDescription(event) {
    this.state.meta.seo = this.state.meta.seo ? this.state.meta.seo : {};
    this.state.meta.seo.description = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSponsorImage(value) {
    this.state.meta.sponsor.image = value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSponsorTracker(event) {
    this.state.meta.sponsor.tracker = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateCssSkinName(event) {
    this.state.meta.css.skinName = event.target.value.trim();
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  deleteImage({sectionIndex, imageIndex}, event) {
    event.preventDefault();
    let field = this.getField(sectionIndex);
    field.altered.images.splice(imageIndex, 1);
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateOnBackend(e) {
    e.preventDefault();
    if (!this.isValid()) {
      return;
    }

    if (!this.state.meta.homepage.image) {
      this.setMessage(true, MAIN_IMAGE_WARNING);
      return false;
    }

    let backendData = {
      postform: {
        categoryId: '-1',
        post_title: this.state.value,
        comment_status: 'open',
        post_type: 'normal',
        post_content: JSON.stringify(this.state.fields),
        postExcerpt: JSON.stringify({'meta' : this.state.meta}),
        post_abstract: '',
        post_extended_title: '',
        post_visibility: 0,
        posts_galleries: '',
        post_subtype: 13,
        postDate: this.state.publishData.postDate,
        'publish-region': this.state.publishData.publishRegion,
        page: 'publish',
        firebase_id: this.state.id,
        primary_image: this.state.meta.homepage.image.url
      }
    };

    this.toggleButton();
    jquery.ajax({
      url: this.state.blogUrl + '/admin/posts/' + this.state.postId + '.json',
      type: 'PUT',
      dataType: 'json',
      data: backendData,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .complete(() => {
      this.toggleButton();
    });
  }

  toggleButton() {
    this.setState({
      buttonDisabled : !this.state.buttonDisabled
    });
  }

  isEmptyfield(fields) {
    let isEmpty = true;
    fields.forEach(field => {
      switch(field.type) {
        case 'grouped':
          if (!this.isEmptyfield(field.columns)) {
            isEmpty = false;
          }
          break;

        case 'content':
        case 'richContent':
        case 'summary':
          if (field.text != '') {
            isEmpty = false;
          }
          break;
        case 'video':
        case 'GIF':
          if(field.url != '') {
            isEmpty = false;
          }
          break;
        case 'image':
        case 'gallery':
        case 'slider':
          isEmpty = false;
          break;
      }
    });
    return isEmpty;
  }
  enablePublish(e) {
    let isError = false;
    let message = '';
    if(this.state.fields.length > 1 && this.isEmptyfield(this.state.fields)) {
      message = FIELD_EMPTY_WARNING;
    }

    if (!this.state.meta || !this.state.meta.homepage.image) {
      message = MAIN_IMAGE_WARNING;
    }

    if(message != '') {
      isError = true;
      e.preventDefault();
    }

    this.setState({
      isError: isError,
      message: message
    });

    return !isError;
  }

  moveImage({sectionIndex, imageIndex, direction}, event) {
    event.preventDefault();
    let field = this.getField(sectionIndex);

    if (direction == 'right') {
      var moveToIndex = imageIndex + 1;
    } else {
      moveToIndex = imageIndex - 1;
    }

    // Normal swapping
    let temp = field.altered.images[imageIndex];
    field.altered.images[imageIndex] = field.altered.images[moveToIndex];
    field.altered.images[moveToIndex] = temp;

    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields}, this.saveData());
  }

  render() {
    let errorField = '';
    if (this.state.isError) {
      errorField = (
        <div className="top-messages">
          <div className="alert alert-danger">
            <span>{this.state.message}</span>
          </div>
        </div>
      );
    }

    let successField = (
      <div id="successField" className="alert alert-info auto-saved" style={{ display: 'none' }}>
        <span className="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>
        <strong>  Post saved </strong>
      </div>
    );
    let connectStatus = '';
    let goToConfig = '';
    let addConfig = '';
    if (this.state.isConnected) {
      connectStatus = (
        <button className='status status-on'>
          <span className='glyphicon glyphicon-ok'></span>ON
        </button>
      );
    } else {
      connectStatus = (
        <button className='status status-off'>
          <span className='glyphicon glyphicon-remove'></span>OFF
        </button>
      );
    }

    if (this.userId==1) {
      goToConfig = <Link className="glyphicon glyphicon-wrench" to={ '/configs' }><span>Go to Config</span></Link>;
      addConfig = <Link className="glyphicon glyphicon-cog" to={ '/config/new' }><span>Add Config</span></Link>;
    }

    let metadata = <Metadata
      meta={this.state.meta}
      userId={this.state.userId}
      blogUrl={this.state.blogUrl}
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
      updateMicrositeName={this.updateMicrositeName.bind(this)}
      updateMicrositeGASnippet={this.updateMicrositeGASnippet.bind(this)}
      updateMicrositeCookiePage={this.updateMicrositeCookiePage.bind(this)}
      toggleWSLLogo={this.toggleWSLLogo.bind(this)}
      toggleSocialSharing={this.toggleSocialSharing.bind(this)}
      deleteImage={this.deleteImage.bind(this)}
      toggleAuthorInfo={this.toggleAuthorInfo.bind(this)}
      editAuthorInfo={this.editAuthorInfo.bind(this)}
    />;

    let updateButton;
    if (this.state.status == 'publish' && moment(this.state.publishData.postDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
      updateButton = (
        <button className="btn btn-primary btn-nav" disabled={this.state.buttonDisabled} onClick={this.updateOnBackend.bind(this)}>
          <span className= "glyphicon glyphicon-refresh"></span>Update
        </button>
      );
    } else if (this.state.isSynced) {
      updateButton = (
        <Link className="glyphicon glyphicon-ok" to={'/publish/' + this.state.id + '?blog=' + this.state.blogName + '&userid=' + this.userId} onClick={this.enablePublish.bind(this)} >
          <span>Go to Publish</span>
        </Link>
      );
    }
    if (undefined == this.state.fields[0] || 'title' != this.state.fields[0].type) {
      this.state.fields.splice(
        0,
        0,
        {
          id: ++this.state.maxId,
          type:'title',
          layout:'normal',
          backgroundClass: 'module-bg-color-neutral-light',
          foregroundColor: null,
          text: this.state.value
        }
      );
    } else {
      this.state.fields[0].text = this.state.value;
    }
    return (
      <div className={this.state.orderMode ? 'bgbody' : '' }>
        <div className="preview-nav">
          <a title="Order Elements" onClick={this.toggleOrderMode.bind(this)} href="#" className="glyphicon glyphicon-move js-minimise"><span>Order Elements</span></a>
          {this.state.isSynced ? <PreviewOnSite postId={this.state.id} blogUrl={this.state.blogUrl} /> : null}
          {updateButton}
          {goToConfig}
          {addConfig}
        </div>
        {connectStatus}
        {errorField}
        {successField}
        <form id="editor-form">
          <div className="form-group">
            <PostTitle
              data={this.state.fields[0]}
              value={this.state.value}
              handleBlur={this.handleBlur.bind(this)}
              handleChange={this.handleChange.bind(this)}
              openResourcePanel={this.openResourcePanel.bind(this)}
              addLayoutToResource={this.addLayoutToResource.bind(this)}
              addBackgroundOptionToResource={this.addBackgroundOptionToResource.bind(this)}
            />
            <ContentList
              fields={this.state.fields}
              addBackgroundOptionToResource={this.addBackgroundOptionToResource.bind(this)}
              updateText={this.updateText.bind(this)}
              updateRichContent={this.updateRichContent.bind(this)}
              updateVideo={this.updateVideo.bind(this)}
              updateGiphy={this.updateGiphy.bind(this)}
              openResourcePanel={this.openResourcePanel.bind(this)}
              addTextArea={this.createNewTextArea.bind(this)}
              addVideo={this.addVideo.bind(this)}
              addResource={this.addResource.bind(this)}
              deleteResource={this.deleteResource.bind(this)}
              addLayoutToResource={this.addLayoutToResource.bind(this)}
              groupSections={this.groupSections.bind(this)}
              ungroupSections={this.ungroupSections.bind(this)}
              moveResourceDown={this.moveResourceDown.bind(this)}
              moveResourceUp={this.moveResourceUp.bind(this)}
              orderMode={this.state.orderMode}
              addImageCaption={this.addImageCaption.bind(this)}
              addImageCaptionOverlay={this.addImageCaptionOverlay.bind(this)}
              addImageCaptionOverlayPosition={this.addImageCaptionOverlayPosition.bind(this)}
              addImageCaptionOverlayBackground={this.addImageCaptionOverlayBackground.bind(this)}
              setAutoPlaySlider={this.setAutoPlaySlider.bind(this)}
              deleteImage={this.deleteImage.bind(this)}
              moveImage={this.moveImage.bind(this)}
            />
          </div>
        </form>
        {this.state.meta ? metadata : ''}
        <CloudinaryUploader
          cloudName={configParams.cloudName}
          uploadPreset={configParams.uploadPreset}
          addImage={this.addImage.bind(this)}
          addImages={this.addImages.bind(this)}
          editImages={this.editImages.bind(this)}
          base={this.props.base}
          slug={this.state.id}
          addImageModule={this.state.addImageModule}
          imageFunction={this.state.imageFunction}
          ref="resourcePanel"
        />
        <div id="preview"></div>
      </div>
    );
  }
}

Editor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Editor;
