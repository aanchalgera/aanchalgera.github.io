/* eslint-disable */
import React from 'react';
import jquery from 'jquery';
import moment from 'moment-timezone';
import TopNavigation from './TopNavigation';
import ContentList from './ContentList';
import PostTitle from './PostTitle';
import CloudinaryUploader from './CloudinaryUploader';
import Metadata from './Metadata/Metadata';
import helpers from '../../utils/generatehash';
import configParams from '../../config/configs.js';
import { initialMeta, getPostType } from '../../containers/lib/helpers';

moment.tz.setDefault(configParams.timezone);
const TITLE_MINLENGTH_WARNING = 'The title should be more than 5 characters';
const TITLE_MAXLENGTH_WARNING = 'The title can be 130 characters long';
const CONTENT_EMPTY_WARNING = 'Add some content to save the post';
const DELETE_SECTION_WARNING = 'Are you sure you want to delete this?';
const CAPTION_WARNING = 'Anchor tag is not allowed in image captions';
const FIELD_EMPTY_WARNING = 'One of the added fields should contain some value';
const MAIN_IMAGE_WARNING = 'Add homepage image to publish this post';
const TWITTER_FIELD_EMPTY = 'Twitter text field cannot be empty';
const FACEBOOK_FIELD_EMPTY = 'Facebook text field cannot be empty';
const FACEBOOK_TEXT_SAME_POST_TITLE =
  'Facebook text cannot be same as post title';

class Editor extends React.Component {
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
        publishRegion: [
          'ES',
          'US',
          'MX',
          'PE',
          'AR',
          'CL',
          'EC',
          'CR',
          'CO',
          'CEA',
          'ROW'
        ]
      },
      postId: '',
      postHash: '',
      isConnected: true,
      status: 'draft',
      isSynced: false,
      isCloudinaryUploaderOpen: false
    };
    this.addImages = this.addImages.bind(this);
    this.addResource = this.addResource.bind(this);
    this.updateSocialFacebookText = this.updateSocialFacebookText.bind(this);
    this.updateSocialTwitterText = this.updateSocialTwitterText.bind(this);
    this.toggleSocialShareVisibility = this.toggleSocialShareVisibility.bind(
      this
    );
    this.toggleDateVisibility = this.toggleDateVisibility.bind(this);
    this.toggleFooter = this.toggleFooter.bind(this);
    this.toggleSummarySocialShareButtons = this.toggleSummarySocialShareButtons.bind(
      this
    );
  }

  init() {
    //this.checkConnectStatus();
    const {
      match: { params: { postname } },
      location: { search },
      history
    } = this.props;

    const query = new URLSearchParams(search);

    this.blogName = query.get('blog');
    this.userId = query.get('userid');
    if (this.blogName == undefined) {
      history.replace('/invalidBlog');
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
            let siteUrl = data[0].site_url;
            jquery
              .ajax({
                url: siteUrl + '/admin/users/' + this.userId + '.json',
                crossDomain: true,
                type: 'GET',
                xhrFields: {
                  withCredentials: true
                }
              })
              .fail((jqxhr, textStatus, error) => {
                this.setMessage(true, error);
              })
              .done(data => {
                this.setState({
                  blogName: this.blogName,
                  blogUrl: siteUrl,
                  userRole: data.role
                });
              });
          } else {
            history.replace('/invalidBlog');
          }
        }
      });
    }
    let regEx = /\D/;
    if (regEx.test(this.userId)) {
      history.replace('/invalidUser');
    } else if (undefined != postname) {
      try {
        this.props.base.fetch('posts/' + postname, {
          context: this,
          then(data) {
            if (data.hasOwnProperty('id')) {
              this.setState({
                id: data.id,
                userId: data.user_id,
                postId: data.publishData.postId || '',
                postHash: data.publishData.postHash || '',
                postType: data.postType || getPostType(this.state.userRole),
                fields: data.sections || [],
                value: data.title,
                maxId: data.maxId,
                status: data.status || this.state.status,
                publishData: data.publishData || this.state.regions,
                meta: data.meta,
                isSynced: true
              });
            } else {
              console.log('Why here');
              this.setState({
                id: postname,
                meta: initialMeta,
                userId: this.userId
              });
            }
          }
        });
      } catch (e) {
        //      Rollbar.critical('Error occured while fetching post data from Firebase', e);
      }
    } else {
      let hashId = helpers.generatePushID();
      let postEditUrl =
        '/edit/post/' +
        hashId +
        '?blog=' +
        this.blogName +
        '&userid=' +
        this.userId;
      this.setState(
        {
          id: hashId,
          meta: initialMeta,
          userId: this.userId,
          postType: query.get('postType') || getPostType(this.state.userRole)
        },
        history.push(postEditUrl)
      );
    }
  }

  componentDidMount() {
    this.init();
  }

  checkConnectStatus() {
    let connectedRef = this.props.base.database().ref('.info/connected');
    connectedRef.on('value', snap => {
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

  openResourcePanel(
    imageFunction,
    currentIndex,
    addImageModule = '',
    addMoreImages = false,
    event
  ) {
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
    currentIndex = currentIndex.toString();
    let { fields } = this.state,
      indexes,
      altered,
      componentIndexes;

    let delimiterIndex = currentIndex.indexOf('#');
    if (delimiterIndex >= 0) {
      indexes = currentIndex.substr(0, delimiterIndex).split('-');
      componentIndexes = currentIndex.substr(delimiterIndex + 1).split('-');
      altered =
        fields[indexes[0]].rows[componentIndexes[0]][componentIndexes[1]];
    } else {
      indexes = currentIndex.split('-');
      if (indexes[1]) {
        altered = fields[indexes[0]].columns[indexes[1]];
      } else {
        altered = fields[indexes[0]];
      }
    }

    let original = fields.splice(indexes[0], 1)[0];
    return { indexes, original, altered };
  }

  isRootComponent(currentIndex) {
    return /^\d+$/.test(currentIndex);
  }

  addResource({ type, currentIndex }) {
    this.state.maxId++;
    let attributes = {
      id: this.state.maxId,
      type: type
    };
    switch (type) {
      case 'content':
      case 'richContent':
        attributes['text'] = '';
        break;
      case 'summary':
        attributes['layout'] = 'normal';
        attributes['text'] = '';
        attributes['showSummarySocialShareButtons'] = false;
        break;
      case 'giphy':
      case 'infogram':
        attributes['layout'] = 'normal';
        attributes['description'] = '';
        break;
      case 'video':
        attributes['layout'] = 'normal';
        attributes['url'] = '';
        break;
    }
    if (this.isRootComponent(currentIndex)) {
      this.state.fields.splice(currentIndex, 0, attributes);
    } else {
      return this.updateResource(currentIndex, attributes);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId
      },
      this.saveData()
    );
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
      const attributes = {
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
      };

      if (this.isRootComponent(currentIndex)) {
        this.state.fields.splice(currentIndex, 0, attributes);
      } else {
        return this.updateResource(currentIndex, attributes);
      }
    } else if (this.state.imageFunction == 'homepage') {
      this.state.meta.homepage.image = {
        url: image.url,
        height: image.height || '',
        width: image.width || '',
        alt: image.alt || '',
        name: image.original_filename
      };
    } else if (
      'otherImage' == this.state.imageFunction ||
      'productImage' == this.state.imageFunction
    ) {
      let field = this.getField(currentIndex);
      field.altered[this.state.imageFunction] = image;
      this.state.fields.splice(field.indexes[0], 0, field.original);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId,
        meta: this.state.meta,
        addImageModule: '',
        imageFunction: ''
      },
      this.saveData()
    );
  }

  addImageCaption(imageId, caption, currentIndex) {
    let field = this.getField(currentIndex);
    if (field.altered.images != undefined) {
      let imageSet = field.altered.images;
      if (imageSet.length > 0) {
        for (let image of imageSet) {
          if (image.spid == imageId) {
            image.description = caption;
          }
        }

        this.state.fields.splice(field.indexes[0], 0, field.original);
        this.setState(
          {
            fields: this.state.fields
          },
          this.saveData()
        );
      }
    } else {
      field.altered.description = caption;
      this.state.fields.splice(field.indexes[0], 0, field.original);
      this.setState(
        {
          fields: this.state.fields
        },
        this.saveData()
      );
    }
  }

  addImageCaptionOverlay(imageId, captionOverlay, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionOverlay = captionOverlay;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImageCaptionOverlayPosition(imageId, captionPosition, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionPosition = captionPosition;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImageCaptionOverlayBackground(imageId, captionBackground, currentIndex) {
    let field = this.getField(currentIndex);
    field.altered.captionBackground = captionBackground;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState(
      {
        fields: this.state.fields
      },
      this.saveData()
    );
  }

  addImages(images, moduleType) {
    let addMoreImages = this.state.addMoreImages;
    let currentIndex = this.state.resourcePanelOpenedBy;
    if (!addMoreImages) {
      this.state.maxId++;
      let attributes = {
        id: this.state.maxId,
        type: moduleType,
        layout: 'normal',
        images
      };
      if (this.isRootComponent(currentIndex)) {
        this.state.fields.splice(currentIndex, 0, attributes);
      } else {
        return this.updateResource(currentIndex, attributes);
      }
    } else {
      let field = this.getField(currentIndex);
      for (let i = 0; i < images.length; i++) {
        field.altered.images.push(images[i]);
      }

      this.state.fields.splice(field.indexes[0], 0, field.original);
    }

    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId,
        addMoreImages: false,
        addImageModule: '',
        imageFunction: ''
      },
      this.saveData()
    );
  }

  editImages(images) {
    const { resourcePanelOpenedBy } = this.state;
    let currentIndex = resourcePanelOpenedBy.currentIndex;
    let imageIndex = resourcePanelOpenedBy.imageIndex;

    let field = this.getField(currentIndex);
    switch (typeof imageIndex) {
      case 'string':
        field.altered[imageIndex] = images[0];
        break;
      case 'number':
        field.altered.images.splice(imageIndex, 1, ...images);
        break;
      default:
        field.altered.url = images[0].url;
        field.altered.alt = images[0].alt;
    }
    this.state.fields.splice(field.indexes[0], 0, field.original);

    this.setState(
      {
        fields: this.state.fields,
        addMoreImages: false,
        addImageModule: ''
      },
      this.saveData()
    );
  }

  addTable(currentIndex) {
    this.state.maxId++;
    this.state.fields.splice(currentIndex, 0, {
      id: this.state.maxId,
      type: 'table',
      layout: 'normal'
    });
    this.setState(
      {
        fields: this.state.fields,
        maxId: this.state.maxId
      },
      this.saveData()
    );
  }

  parentDiv(el) {
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == 'div') {
        return el;
      }
    }
  }

  handleChange(ev) {
    this.setState({
      value: ev.currentTarget.value
    });
  }

  handleBlur(ev) {
    let title = ev.currentTarget.value.trim();
    if (undefined == title || '' == title || 5 >= title.length) {
      this.setMessage(true, TITLE_MINLENGTH_WARNING);
      return;
    } else {
      this.setMessage(false);
    }

    if (this.state.fields.length < 2) {
      this.addResource({ type: 'content', currentIndex: 1 });
    }

    this.setState(
      {
        value: title
      },
      this.saveData()
    );
  }

  isValid() {
    if (
      undefined == this.state.value ||
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
      switch (field.type) {
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

  saveData() {
    if (!this.isValid()) {
      return;
    }

    let userStatus =
      this.blogName + '_' + this.state.userId + '_' + this.state.status;
    let data = {
      id: this.state.id,
      user_id: this.state.userId,
      user_status: userStatus,
      blog_status: this.blogName + '_' + this.state.status,
      blogName: this.blogName,
      title: this.state.value,
      sections: this.state.fields,
      maxId: this.state.maxId,
      status: this.state.status || '',
      publishData: this.state.publishData || this.state.regions,
      meta:
        this.state.meta != undefined
          ? this.state.meta
          : {
              index: '',
              homepage: { content: '' },
              sponsor: { name: '', image: '', tracker: '' },
              css: { skinName: '' },
              seo: {},
              microsite: {
                name: '',
                gaSnippet: '',
                showWSLLogo: true,
                showSocialButtons: true
              },
              author: { showAuthorInfo: false },
              social: { facebook: '', twitter: '' },
              showDate: false,
              showSocialShareButtons: true,
              footer: { hideFooter: false, content: '' }
            }
    };

    if (this.state.postId != undefined && this.state.postId != '') {
      data.publishData.postId = this.state.postId;
      data.publishData.postHash = this.state.postHash;
    }

    let postType = 'normal';
    let blogStatus = this.blogName + '_' + this.state.status;
    if (
      ['ROLE_BRANDED_COLLABORATOR', 'ROLE_BRANDED_COORDINATOR'].indexOf(
        this.state.userRole
      ) > -1
    ) {
      postType = 'club';
    }
    data.postType = postType;

    let listData = {
      id: this.state.id,
      title: this.state.value,
      status: this.state.status,
      user_id: this.state.userId,
      user_status: userStatus,
      blog_status: blogStatus,
      blog_name: this.blogName,
      blog_post_type: blogStatus + '_' + postType
    };

    this.props.base.post('posts_list/' + this.state.id, {
      data: listData,
      then() {}
    });
    try {
      const _this = this;
      this.props.base.update('posts/' + this.state.id, {
        data: data,
        then() {
          let successField = document.getElementById('successField');
          if (null != successField) {
            document.getElementById('successField').style.display = 'block';
            setTimeout(
              () =>
                (document.getElementById('successField').style.display =
                  'none'),
              4000
            );
          }
          _this.setState({ isSynced: true });
        }
      });
    } catch (e) {
      //      Rollbar.critical('Error occured on saving data to Firebase', e);
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
      case 'backgroundClass':
        field.altered.backgroundClass =
          field.altered.backgroundClass == value ? '' : value;
        break;
      case 'foregroundColor':
        field.altered.foregroundColor =
          field.altered.foregroundColor == value ? '' : value;
        break;
      case 'parallax':
        field.altered.parallax = !field.altered.parallax;
        event.target.className = 'active';
        break;
      case 'backgroundRepeat':
        field.altered.backgroundRepeat = !field.altered.backgroundRepeat;
        break;
      case 'backgroundFade':
        field.altered.backgroundFade = !field.altered.backgroundFade;
        break;
      case 'removeBackgroundImage':
        field.altered.backgroundImage = '';
        field.altered.backgroundFade = '';
        field.altered.backgroundRepeat = '';
        field.altered.backgroundFullscreen = '';
        break;
      case 'backgroundFullscreen':
        field.altered.backgroundFullscreen = !field.altered
          .backgroundFullscreen;
        break;
      case 'actualizacion':
        field.altered.actualizacion = !field.altered.actualizacion;
        event.target.className = 'active';
        break;
    }
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  deleteResource(event) {
    event.preventDefault();
    //    TODO: fix
    //    if (confirm(DELETE_SECTION_WARNING)) {
    let currentIndex = this.parentDiv(event.target).dataset.id;
    this.state.fields.splice(currentIndex, 1);
    this.setState({ fields: this.state.fields }, this.saveData());
    //    }
  }

  groupSections(currentIndex, group) {
    this.state.maxId++;
    let objects = this.state.fields.splice(currentIndex, group);
    for (let object of objects) {
      switch (object.type) {
        case 'image':
        case 'video':
        case 'gallery':
        case 'slider':
        case 'giphy':
        case 'infogram':
        case 'datawrapper':
          object.backgroundFade = '';
          object.backgroundRepeat = '';
          object.backgroundFullscreen = '';
          object.backgroundClass = '';
          object.backgroundImage = '';
          object.parallax = '';
          break;
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
      this.state.fields.splice(
        currentIndex,
        0,
        obj.columns[0],
        obj.columns[1],
        obj.columns[2]
      );
    }

    this.setState({ fields: this.state.fields }, this.saveData());
  }

  updateResource(currentIndex, attributes) {
    let field = this.getField(currentIndex);
    Object.assign(field.altered, attributes);
    this.state.fields.splice(field.indexes[0], 0, field.original);
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

  addLayoutToResource(event) {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let value = event.target.dataset.layout;
    let field = this.getField(currentIndex);
    field.altered.layout = value;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  addGroupToResource(event) {
    event.preventDefault();
    let currentIndex = this.parentDiv(event.target).dataset.id;
    let value = event.target.dataset.group;
    let field = this.getField(currentIndex);
    field.altered.group = field.altered.group == value ? '' : value;
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
    this.state.meta.footer.content = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateHomepageContent(value) {
    this.state.meta.homepage.content = value;
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

  updateCssSkinName(event) {
    this.state.meta.css.skinName = event.target.value.trim();
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSocialFacebookText(event) {
    this.state.meta.social.facebook = event.target.value.trim();
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  updateSocialTwitterText(event) {
    this.state.meta.social.twitter = event.target.value;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleSocialShareVisibility() {
    this.state.meta.showSocialShareButtons = !this.state.meta
      .showSocialShareButtons;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleDateVisibility() {
    this.state.meta.showDate = !this.state.meta.showDate;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleFooter() {
    this.state.meta.footer.hideFooter = !this.state.meta.footer.hideFooter;
    this.setState({ meta: this.state.meta }, this.saveData());
  }

  toggleSummarySocialShareButtons(event) {
    event.preventDefault();
    let currentIndex = event.target.dataset.id;
    let field = this.getField(currentIndex);
    field.altered.showSummarySocialShareButtons = event.target.checked;
    this.state.fields.splice(field.indexes[0], 0, field.original);
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  deleteImage({ sectionIndex, imageIndex }, event) {
    event.preventDefault();
    let field = this.getField(sectionIndex);
    switch (typeof imageIndex) {
      case 'number':
        field.altered.images.splice(imageIndex, 1);
        break;
      case 'string':
        field.altered[imageIndex] = '';
    }
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
        user_id: this.state.userId,
        post_title: this.state.value,
        comment_status: this.state.meta.comment.status,
        post_type: 'normal',
        post_content: JSON.stringify(this.state.fields),
        postExcerpt: JSON.stringify({ meta: this.state.meta }),
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

    jquery
      .ajax({
        url: this.state.blogUrl + '/admin/posts/' + this.state.postId + '.json',
        type: 'PUT',
        dataType: 'json',
        data: backendData,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      })
      .done(() => {
        this.setMessage(true, 'Post Updated');
      });
  }

  isEmptyfield(fields) {
    let isEmpty = true;
    fields.forEach(field => {
      switch (field.type) {
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
        case 'giphy':
        case 'infogram':
          if (field.url != '') {
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

    if (this.state.fields.length > 1 && this.isEmptyfield(this.state.fields)) {
      message = FIELD_EMPTY_WARNING;
    }

    if (!this.state.meta || !this.state.meta.homepage.image) {
      message = MAIN_IMAGE_WARNING;
    }

    if (message != '') {
      isError = true;
      e.preventDefault();
    }

    this.setState({
      isError: isError,
      message: message
    });

    return !isError;
  }

  moveImage({ sectionIndex, imageIndex, direction }, event) {
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
    this.setState({ fields: this.state.fields }, this.saveData());
  }

  toggleCloudinaryUploader(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      isCloudinaryUploaderOpen: !this.state.isCloudinaryUploaderOpen
    });
  }

  render() {
    let errorField = '';
    if (this.state.isError) {
      errorField = (
        <div className="top-messages">
          <div className="alert alert-danger">
            <span>
              {this.state.message}
            </span>
          </div>
        </div>
      );
    }

    let successField = (
      <div
        id="successField"
        className="alert alert-info auto-saved"
        style={{ display: 'none' }}
      >
        <span className="glyphicon glyphicon-floppy-save" aria-hidden="true" />
        <strong> Post saved </strong>
      </div>
    );

    let metadata = (
      <Metadata
        meta={this.state.meta}
        userId={this.state.userId}
        blogUrl={this.state.blogUrl}
        updateIndexMetadata={this.updateIndexMetadata.bind(this)}
        updateSeoTitle={this.updateSeoTitle.bind(this)}
        updateSeoDescription={this.updateSeoDescription.bind(this)}
        updateFooterCredits={this.updateFooterCredits.bind(this)}
        updateHomepageContent={this.updateHomepageContent.bind(this)}
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
        updateSocialFacebookText={this.updateSocialFacebookText}
        updateSocialTwitterText={this.updateSocialTwitterText}
        toggleSocialShareVisibility={this.toggleSocialShareVisibility}
        toggleDateVisibility={this.toggleDateVisibility}
        toggleFooter={this.toggleFooter}
      />
    );

    if (
      undefined == this.state.fields[0] ||
      'title' != this.state.fields[0].type
    ) {
      this.state.fields.splice(0, 0, {
        id: ++this.state.maxId,
        type: 'title',
        layout: 'big',
        backgroundClass: 'module-bg-color-neutral-light',
        foregroundColor: null,
        text: this.state.value
      });
    } else {
      this.state.fields[0].text = this.state.value;
    }
    return (
      <div className={this.state.orderMode ? 'bgbody' : ''}>
        <TopNavigation
          id={this.state.id}
          blogName={this.state.blogName}
          blogUrl={this.state.blogUrl}
          userId={this.userId}
          status={this.state.status}
          publishData={this.state.publishData}
          isSynced={this.state.isSynced}
          isConnected={this.state.isConnected}
          updateOnBackend={this.updateOnBackend.bind(this)}
          enablePublish={this.enablePublish.bind(this)}
          toggleOrderMode={this.toggleOrderMode.bind(this)}
          toggleCloudinaryUploader={this.toggleCloudinaryUploader.bind(this)}
          userRole={this.state.userRole}
        />
        {errorField}
        {successField}
        <div className="form-group">
          <PostTitle
            data={this.state.fields[0]}
            value={this.state.value}
            handleBlur={this.handleBlur.bind(this)}
            handleChange={this.handleChange.bind(this)}
            openResourcePanel={this.openResourcePanel.bind(this)}
            addLayoutToResource={this.addLayoutToResource.bind(this)}
            addBackgroundOptionToResource={this.addBackgroundOptionToResource.bind(
              this
            )}
          />
          <ContentList
            fields={this.state.fields}
            addBackgroundOptionToResource={this.addBackgroundOptionToResource.bind(
              this
            )}
            updateText={this.updateText.bind(this)}
            updateRichContent={this.updateRichContent.bind(this)}
            updateResource={this.updateResource.bind(this)}
            openResourcePanel={this.openResourcePanel.bind(this)}
            addResource={this.addResource}
            addTable={this.addTable.bind(this)}
            deleteResource={this.deleteResource.bind(this)}
            addLayoutToResource={this.addLayoutToResource.bind(this)}
            addGroupToResource={this.addGroupToResource.bind(this)}
            groupSections={this.groupSections.bind(this)}
            ungroupSections={this.ungroupSections.bind(this)}
            moveResourceDown={this.moveResourceDown.bind(this)}
            moveResourceUp={this.moveResourceUp.bind(this)}
            orderMode={this.state.orderMode}
            addImageCaption={this.addImageCaption.bind(this)}
            addImageCaptionOverlay={this.addImageCaptionOverlay.bind(this)}
            addImageCaptionOverlayPosition={this.addImageCaptionOverlayPosition.bind(
              this
            )}
            addImageCaptionOverlayBackground={this.addImageCaptionOverlayBackground.bind(
              this
            )}
            setAutoPlaySlider={this.setAutoPlaySlider.bind(this)}
            deleteImage={this.deleteImage.bind(this)}
            moveImage={this.moveImage.bind(this)}
            toggleSummarySocialShareButtons={
              this.toggleSummarySocialShareButtons
            }
          />
        </div>
        {this.state.meta ? metadata : ''}
        <CloudinaryUploader
          cloudName={configParams.cloudName}
          uploadPreset={configParams.uploadPreset}
          folder={configParams.folder}
          addImage={this.addImage.bind(this)}
          addImages={this.addImages}
          editImages={this.editImages.bind(this)}
          base={this.props.base}
          slug={this.state.id}
          addImageModule={this.state.addImageModule}
          imageFunction={this.state.imageFunction}
          isCloudinaryUploaderOpen={this.state.isCloudinaryUploaderOpen}
          toggleCloudinaryUploader={this.toggleCloudinaryUploader.bind(this)}
          ref="resourcePanel"
        />
        <div id="preview" />
      </div>
    );
  }
}

export default Editor;
